import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "NEXTRENDLOGO1.png" }) {
        childImageSharp {
          fixed(width: 170) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <Img width='170' fixed={data.placeholderImage.childImageSharp.fixed} />
  );
};

export default Image;
