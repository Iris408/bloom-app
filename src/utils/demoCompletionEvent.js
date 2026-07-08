export function triggerDemoCompletionEvent(type = "step") {
    window .dispatchEvent(
        new CustomEvent("bloom-demo-completion", {
            detail: { type },
        })
    )
}