// function call api json server
export function getCoursesApi(Api,callback) {
  fetch(Api)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
