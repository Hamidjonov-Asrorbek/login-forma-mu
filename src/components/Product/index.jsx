import React, { useEffect, useState } from "react";
import loadergif from "/src/assets/loader.gif";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { product, product_item, product_list } from "./style.module.css";
import { colors } from "@mui/material";

const date = new Date();
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function Product() {
  const [expanded, setExpanded] = useState(false);
  const [data, setUser] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setLoader(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.slice(0, 20));
        setLoader(false);
      });
  }, []);
  console.log(data);
  return (
    <section className={product}>
      <h1>Product</h1>
      {loader && <img src={loadergif} className="loader"></img>}
      <ul className={product_list}>
        {data.length &&
          data.map(({ title, description, price, image, id }, ind) => {
            return (
              <li key={id}>
                <Card
                  sx={{
                    maxWidth: 355,
                    borderRadius: "10px",
                    border: "1px solid #1976d2",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        <img src={image} alt={title} />
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={title.slice(0, 30)}
                    subheader={date.toLocaleDateString()}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {description.slice(0, 70)}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon style={{ color: "red" }} />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                </Card>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default Product;
