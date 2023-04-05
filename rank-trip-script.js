    // Script to handle star rating selection
    const stars = document.querySelectorAll('.rank i');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rank = star.getAttribute('data-star');
        document.querySelector('#tripRank').value = rank;
        stars.forEach(s => {
          if (s.getAttribute('data-star') <= rank) {
            s.classList.remove('far');
            s.classList.add('fas');
          } else {
            s.classList.remove('fas');
            s.classList.add('far');
          }
        });
      });
    });