interface Lecture {
  id: number,
  title: string,
  description: string,
  href: string,
}

interface ViewAllLecturesRequest {
  classID: number,
}

interface ViewAllLecturesResponse {
  lectures: Lecture[],
}

export default Lecture