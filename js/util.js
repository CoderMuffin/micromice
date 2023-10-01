export function animator(fn) {
    let animator = {
        _stopped: false,
        _last: Date.now(),
        stop: function() {
            animator._stopped = true;
        },
        start: function() {
            animator._stopped = false;
            animator.tick();
        },
        tick: function() {
            let now = Date.now();
            fn(now - animator._last);
            animator._last = now;

            window.requestAnimationFrame(() => animator.tick());
        }
    };

    animator.tick();
    return animator;
}
