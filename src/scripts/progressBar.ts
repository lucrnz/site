let setup = false;

export default function setupProgressBar() {
  if (setup) {
    return;
  }
  window.addEventListener("scroll", () => {
    const progressBar = document.querySelector(
      "header > .progress-bar"
    )! as HTMLDivElement;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const percentage = parseFloat(
      ((window.scrollY / totalHeight) * 100).toFixed(2)
    );

    if (percentage > 0) {
      progressBar.style.display = "block";
      progressBar.style.width = `${percentage}%`;
    } else {
      progressBar.style.display = "none";
      progressBar.style.width = "0";
    }
  });
  setup = true;
}
