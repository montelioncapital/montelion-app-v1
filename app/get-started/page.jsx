useEffect(() => {
  (async () => {
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;

    if (!session?.user) {
      router.replace("/login");
      return;
    }

    const uid = session.user.id;
    setUserId(uid);

    const { data: onboard } = await supabase
      .from("onboarding_state")
      .select("current_step")
      .eq("user_id", uid)
      .maybeSingle();

    const step = onboard?.current_step ?? 0;
    setCurrentStep(step);

    // 🔥 Nouvelle logique de redirection automatique
    if (step >= 10) {
      // l’onboarding du contrat est terminé → on envoie vers advanced
      router.replace("/get-started/advanced");
      return;
    }

    setLoading(false);
  })();
}, [router]);
