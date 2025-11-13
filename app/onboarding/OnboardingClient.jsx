// 1) Lire l'état d'onboarding
const { data: onboard, error: onboardErr } = await supabase
  .from("onboarding_state")
  .select("current_step")
  .eq("user_id", uid)
  .maybeSingle();

if (!onboardErr && onboard?.current_step != null) {
  // 👉 Si current_step = 0 => on renvoie vers /get-started
  if (onboard.current_step === 0) {
    setLoading(false);
    router.replace("/get-started");
    return;
  }

  setStep(onboard.current_step); // 1 à 6
} else {
  setStep(1);
}
