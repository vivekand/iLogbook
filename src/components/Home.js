import Notes from "./Notes";
export default function Home(props) {
  const {showAlert}=props;
  return (
    
    <div>
      {/* <Notes showAlert={props.showAlert}/> */}
      <Notes showAlert={showAlert}/>
    </div>
  );
}
