const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const speed = 4000; // lower = faster
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout
      (updateCount, 50);
    } else {
      // ✅ add + symbol only when finished
      counter.innerText = target + (counter.classList.contains('plus') ? '+' : '');
    }
  };

  updateCount();
});
