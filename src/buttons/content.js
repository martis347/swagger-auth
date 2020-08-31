(() => {
  const isSwaggerPage =
    document.getElementsByClassName("swagger-section").length > 0 ||
    document.getElementById("swagger-ui") != null;

  if (!isSwaggerPage) {
    return;
  }

  const buttonsHandler = new window.SwaggerButtonsHandler(
    window.swaggerStorageProvider
  );
  buttonsHandler.initialize();
})();
