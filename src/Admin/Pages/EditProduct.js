import React, { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import { useParams, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { styled as style } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, TextField, CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import firebaseFileUpload from "../Firebase";
import Spinner from "../../Components/Spinner";

//edit product
function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    userRequest
      .get(`/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err.response.data.message));
  }, [id]);
  return <div> {product && <UpdateProduct product={product} />}</div>;
}

export default EditProduct;

//
const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
`;
const Title = styled.h4`
  margin-top: 35px;
`;
const SubTitle = styled.h6`
  margin: 0;
`;
const Upload = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;
const ErrorText = styled.p`
  color: red;
`;
const FileUpload = style("input")({
  display: "none",
});

function UpdateProduct({ product }) {
  const [progress, setProgress] = useState(0); //progress of uploading
  const [image, setImage] = useState(product.image); //file
  const [loading, setLoading] = useState(false); //loading
  const [imageError, setImageError] = useState(false);
  const history = useHistory();
  const fileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];
      firebaseFileUpload({ file, setProgress, setImage, setLoading });
      setImageError(false); //files send to firebase file uploader from- fire base/index.js
    }
    return;
  };

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        title: product.title,
        description: product.description,
        categories: product.categories.toString(),
        size: product.size.toString(),
        colour: product.colour.toString(),
        price: product.price,
        inStock: product.inStock,
      },
      validationSchema: formValidationSchema,
      onSubmit: (editedproduct) => {
        editProduct(editedproduct);
      },
    });

  const editProduct = (editedproduct) => {
    editedproduct.image = image;
    editedproduct.categories = editedproduct.categories.split(",");
    editedproduct.size = editedproduct.size.toUpperCase().split(",");
    editedproduct.colour = editedproduct.colour.split(",");
    userRequest
      .put(`/product/${product._id}`, editedproduct)
      .then(() => history.push("/admin/product"))
      .catch((err) => console.log(err.response.data.message));
  };
  return (
    <Container onSubmit={handleSubmit}>
      <Title>Update Product</Title>
      <SubTitle>Image</SubTitle>
      <Upload>
        <label htmlFor="contained-button-file">
          <FileUpload
            onChange={fileUpload}
            accept="image/*"
            id="contained-button-file"
            type="file"
          />
          <Button
            variant="text"
            disabled={loading}
            color="secondary"
            component="span"
          >
            <FileUploadIcon />
            {loading ? <Spinner /> : "Change"}
          </Button>
        </label>
        {image && <Image src={image}></Image>}
      </Upload>
      {imageError && <ErrorText>Image Required</ErrorText>}
      <SubTitle>Title</SubTitle>
      <TextField
        sx={{ maxWidth: 400, width: "100%" }}
        label="Shirt"
        color="secondary"
        variant="outlined"
        id="title"
        value={values.title}
        error={errors.title && touched.title}
        helperText={errors.title && touched.title && errors.title}
        onChange={handleChange}
        onBlur={handleBlur}
      ></TextField>
      <SubTitle>Description</SubTitle>
      <TextField
        sx={{ maxWidth: 400, width: "100%" }}
        label="description..."
        color="secondary"
        variant="outlined"
        id="description"
        value={values.description}
        error={errors.description && touched.description}
        helperText={
          errors.description && touched.description && errors.description
        }
        onChange={handleChange}
        onBlur={handleBlur}
      ></TextField>
      <SubTitle>Categories</SubTitle>
      <TextField
        sx={{ maxWidth: 400, width: "100%" }}
        label="mens,kids"
        color="secondary"
        variant="outlined"
        id="categories"
        value={values.categories}
        error={errors.categories && touched.categories}
        helperText={
          errors.categories && touched.categories && errors.categories
        }
        onChange={handleChange}
        onBlur={handleBlur}
      ></TextField>
      <SubTitle>Size</SubTitle>
      <TextField
        sx={{ maxWidth: 400, width: "100%" }}
        label="M,S,XL"
        color="secondary"
        variant="outlined"
        id="size"
        value={values.size}
        error={errors.size && touched.size}
        helperText={errors.size && touched.size && errors.size}
        onChange={handleChange}
        onBlur={handleBlur}
      ></TextField>
      <SubTitle>Colour</SubTitle>
      <TextField
        sx={{ maxWidth: 400, width: "100%" }}
        label="red,blue"
        color="secondary"
        variant="outlined"
        id="colour"
        value={values.colour}
        error={errors.colour && touched.colour}
        helperText={errors.colour && touched.colour && errors.colour}
        onChange={handleChange}
        onBlur={handleBlur}
      ></TextField>
      <SubTitle>Price</SubTitle>
      <TextField
        sx={{ maxWidth: 400, width: "100%" }}
        label="200"
        color="secondary"
        variant="outlined"
        id="price"
        value={values.price}
        error={errors.price && touched.price}
        helperText={errors.price && touched.price && errors.price}
        onChange={handleChange}
        onBlur={handleBlur}
      ></TextField>
      <SubTitle>Stock</SubTitle>
      <FormControl
        sx={{ maxWidth: 400, width: "100%" }}
        error={errors.inStock && touched.inStock}
      >
        <InputLabel>In Stock</InputLabel>
        <Select
          value={values.inStock}
          label="Stock"
          name="inStock"
          error={errors.inStock && touched.inStock}
          onChange={handleChange}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
        <FormHelperText>
          {errors.inStock && touched.inStock && errors.inStock}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginLeft: 20 }}
        type="submit"
      >
        Update
      </Button>
    </Container>
  );
}

//validation schema
const formValidationSchema = yup.object().shape({
  title: yup.string().required("Title Required"),
  description: yup.string().required("Description Required"),
  categories: yup.string().required("Categories Required"),
  size: yup.string().required("Size Required"),
  colour: yup.string().required("Colour Required"),
  price: yup.number("price must be number").required("Price Required"),
  inStock: yup.string().required("InStock Required"),
});
