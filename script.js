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
    });
	  
	input.addEventListener('input', e => {
		const v = e.target.value.replace(/\D/g,'').slice(-1);
		e.target.value = v;
		if (v) {
		    const next = inputs[idx+1];
		    if (next) next.focus();
		}
	});

	input.addEventListener('paste', e => {
		e.preventDefault();
		const paste = (e.clipboardData || window.clipboardData).getData('text');
		const digits = paste.replace(/\D/g, '').split(''); // keep only digits, turn into array

		for (let i = 0; i < digits.length && (idx + i) < inputs.length; i++) {
		    inputs[idx + i].value = digits[i];
		}

		const focusIdx = Math.min(inputs.length - 1, idx + digits.length);
		inputs[focusIdx].focus();
	});
	  
  });
});
