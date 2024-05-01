export default function setupProgressBar() {
  window.addEventListener("scroll", () => {
    const progressBar = document.querySelector(
      "header > .progress-bar"
    ) as HTMLDivElement | null;
    if (!progressBar) return;

    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const percentage = Number.parseFloat(
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
}
