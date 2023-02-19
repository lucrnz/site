let configured = false;

const setupProgressBar = () => {
  if (configured) {
    return;
  }

  const progressBar = document.querySelector(
    "header > .progress-bar"
  )! as HTMLDivElement;

  window.addEventListener("scroll", () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const percentage = parseFloat(
      ((window.pageYOffset / totalHeight) * 100).toFixed(2)
    );

    if (percentage > 0) {
      progressBar.style.display = "block";
      progressBar.style.width = `${percentage}%`;
    } else {
      progressBar.style.display = "none";
      progressBar.style.width = "0";
    }
  });

  configured = true;
};

export default setupProgressBar;
