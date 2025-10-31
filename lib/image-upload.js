// this is the customer which is giving the order()


// Upload file to ImageKit using your server-side API
export const uploadToImageKit = async (file, fileName) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    const response = await fetch("/api/imagekit/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Upload failed");
    }

    const result = await response.json();

    return {
      success: true,
      data: {
        fileId: result.fileId,
        name: result.name,
        url: result.url,
        width: result.width,
        height: result.height,
        size: result.size,
      },
    };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Helper to build ImageKit transformation URLs
export const buildTransformationUrl = (src, transformations = []) => {
  // src = "https://ik.imagekit.io/faiz/myphoto.jpg"
  // transformation = [{ width: 300, height: 200, effect: "remove-bg" }];


  if (!transformations.length) return src;

  const transformParams = transformations
    .map((transform) => {
      const params = [];

      // Handle resizing transformations
      if (transform.width) params.push(`w-${transform.width}`);
      if (transform.height) params.push(`h-${transform.height}`);
      if (transform.cropMode) params.push(`cm-${transform.cropMode}`);

      // Handle effects
      if (transform.effect) params.push(`e-${transform.effect}`);


      // params = ["w-300", "h-200", "e-remove-bg"]
      return params.join(",");    //"w-300,h-200,e-remove-bg"
    })
    .filter((param) => param.length > 0)   // .filter() removes any empty parameters (just in case).
    .join(":");
  // [
  //   "w-300,h-200,e-remove-bg",
  //   "w-100,h-100,e-grayscale"
  // ].join(":")
  // → "w-300,h-200,e-remove-bg:w-100,h-100,e-grayscale"




  // Insert transformation parameters into URL
  if (src.includes("/tr:")) {
    // Already has transformations, append to existing
    return src.replace("/tr:", `/tr:${transformParams}:`);
    // src = "https://ik.imagekit.io/faiz/tr:w-200,h-200/photo.jpg"
    // transformParams = "e-remove-bg"

    // → returns "https://ik.imagekit.io/faiz/tr:w-200,h-200:e-remove-bg/photo.jpg"
  } else {
    // Add new transformations
    const urlParts = src.split("/");
    const fileIndex = urlParts.length - 1;
    urlParts.splice(fileIndex, 0, `tr:${transformParams}`);
    return urlParts.join("/");
  }
  // src = "https://ik.imagekit.io/faiz/photo.jpg"
  // transformParams = "w-300,h-200,e-remove-bg"

  // urlParts = ["https:", "", "ik.imagekit.io", "faiz", "photo.jpg"]
  // fileIndex = 4
  // After splice →["https:", "", "ik.imagekit.io", "faiz", "tr:w-300,h-200,e-remove-bg", "photo.jpg"]

  // → Final URL = "https://ik.imagekit.io/faiz/tr:w-300,h-200,e-remove-bg/photo.jpg"

};
