// helper pour savoir où envoyer l'utilisateur
function getRedirectForStep(step, completed) {
  if (!step || step <= 0) return "/get-started";

  if (!completed) {
    if (step >= 1 && step <= 5) return "/onboarding";
    if (step === 6) return "/onboarding";        // proof of address est dans l'onboarding
    if (step === 7) return "/contract/ready";    // nouvelle page "bridge"
    if (step === 8) return "/contract";          // page de signature
  }

  // si tout est terminé ou step inconnu → dashboard / home
  return "/";
}

async function onSubmit(e) {
  e.preventDefault();
  setErr("");
  setOk("");
  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pwd,
  });

  if (error) {
    setLoading(false);
    if (error.message?.toLowerCase().includes("invalid")) {
      setErr("Email ou mot de passe incorrect.");
    } else {
      setErr(error.message || "Impossible de se connecter.");
    }
    return;
  }

  if (!data?.user) {
    setLoading(false);
    setErr("Impossible de récupérer l'utilisateur.");
    return;
  }

  setOk("Connexion réussie.");

  try {
    const userId = data.user.id;

    const { data: onboarding, error: onboardingErr } = await supabase
      .from("onboarding_state")
      .select("current_step, completed")
      .eq("user_id", userId)
      .maybeSingle();

    if (onboardingErr && onboardingErr.code !== "PGRST116") {
      console.error("onboarding_state error:", onboardingErr);
    }

    // si aucune ligne → on en crée une à step 1
    if (!onboarding) {
      const { error: insertErr } = await supabase
        .from("onboarding_state")
        .insert({
          user_id: userId,
          current_step: 1,
          completed: false,
        });

      if (insertErr) {
        console.error("onboarding_state insert error:", insertErr);
        router.push("/");
        return;
      }

      router.push("/onboarding");
      return;
    }

    const redirectTo = getRedirectForStep(
      onboarding.current_step,
      onboarding.completed
    );

    router.push(redirectTo);
  } catch (e) {
    console.error(e);
    router.push("/");
  } finally {
    setLoading(false);
  }
}
