document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  alert(`Terima kasih ${name}! Pesan Anda telah dikirim.`);
  this.reset();
});