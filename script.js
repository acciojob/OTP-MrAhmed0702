document.addEventListener('DOMContentLoaded', () => {
  const inputs = Array.from(document.querySelectorAll('.code'));
  if (!inputs.length) return;

  inputs[0].focus();

  inputs.forEach((input, idx) => {
    input.type = input.type || 'text';
    input.inputMode = 'numeric';
    input.autocomplete = 'one-time-code';

    input.addEventListener('focus', () => input.select());

    input.addEventListener('keydown', (e) => {
      const key = e.key;

      if (key === 'Backspace') {
        e.preventDefault();
        if (input.value) {
          input.value = '';
        } else {
          const prev = inputs[idx - 1];
          if (prev) {
            prev.value = '';
            prev.focus();
          }
        }
        return;
      }

      // arrow navigation
      if (key === 'ArrowLeft') {
        e.preventDefault();
        const prev = inputs[idx - 1];
        if (prev) prev.focus();
        return;
      }
		
      if (key === 'ArrowRight') {
        e.preventDefault();
        const next = inputs[idx + 1];
        if (next) next.focus();
        return;
      }

      if (key.length === 1 && !/^\d$/.test(key)) {
        e.preventDefault();
      }

      if (/^\d$/.test(key)) {
        setTimeout(() => {
          if (input.value) {
            const next = inputs[idx + 1];
            if (next) next.focus();
          }
        }, 10);
      }
    });

  });
});
