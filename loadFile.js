/////// Cargar el Background ////////

const image_input = document.getElementById("image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").src = `${uploaded_image}`;
  });
  reader.readAsDataURL(this.files[0]);
});
