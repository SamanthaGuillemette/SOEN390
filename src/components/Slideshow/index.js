import SimpleImageSlider from "react-simple-image-slider";
const images = [
  { url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/03/Among-Us-Random-Name-Generator.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5" },
  { url: "https://animehunch.com/wp-content/uploads/2021/05/rengoku-FI-768x432.jpg" },
];

const styles = {
    Title:{
        fontSize:45,
        marginLeft:440,
        color: "blue",
        

    },

    Image:{
        position: "absolute",
        marginLeft:225,
     

    }
}

function Slideshow()  {
  return (
    <div>
    <br/>
    <h2 style={styles.Title}>Our top donators</h2>
      <SimpleImageSlider style={styles.Image}
        width={796}
        height={404}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}

export default Slideshow;