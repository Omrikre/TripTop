const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
  member.addEventListener('mouseover', () => {
    // increase image size
    member.querySelector('img').style.transform = 'scale(1.2)';
    member.querySelector('.member-name').style.opacity = '1';
  });

  member.addEventListener('mouseout', () => {
    // reset image size
    member.querySelector('img').style.transform = 'scale(1)';
    member.querySelector('.member-name').style.opacity = '0';
  });
});
