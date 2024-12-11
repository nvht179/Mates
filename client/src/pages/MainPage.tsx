import Button from "../components/Button";
import ClassCardList from "../components/ClassCardList";

function MainPage() {
  const classes = [
    {
      name: "Math hihihihihihi dhifhgifjnd dasf aewvda dav sdvbadfv gwvwrv vgndofw i efhawigoru  hiwoeufhwegfdgfi dhiafwuehfbwajlkv",
      image: "https://picsum.photos/1920/1080/"
    },
    {
      name: "Science",
      image: "https://picsum.photos/1920/1080/"
    },
    {
      name: "Math",
      image: "https://picsum.photos/1920/1080/"
    },
    {
      name: "trom",
      image: "https://picsum.photos/1920/1080/"
    },
    {
      name: "thi",
      image: "https://picsum.photos/1920/1080/"
    },
    {
      name: "nghi",
      image: "https://picsum.photos/1920/1080/"
    }
  ]

    return <div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl font-bold m-4">My classes</p>
        <Button className="m-4">Create or join Class</Button>
      </div>
      <div className="border-b-2"></div>
      <ClassCardList classes={classes}/>
    </div>
}

export default MainPage;