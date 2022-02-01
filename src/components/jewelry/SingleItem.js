import React, { Component } from "react";
import { Carousel } from "bootstrap";
import ImageGallery from "react-image-gallery";
import currencyFormatter from "currency-formatter";
import { Table } from "react-bootstrap";

class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleImageGallery = this.handleImageGallery.bind(this);
  }

  handleImageGallery(res) {
    console.log("inside handleImageGallery");
    var imgArr = [];
    if (res) {
      function showShapeImage(shape) {
        let imageurl =
          "https://cdn.kwiat.com/apps/kwiat-elastic-search/dia-shapes/" +
          shape +
          ".jpg";
        return imageurl;
      }
      function showWebImage(img) {
        var src = "https://cdn4.kwiat.com/source-images/web/original/" + img;
        return src;
      }
      function showimage(image) {
        let img,
          str = "";
        if (image && image != null) {
          let searchimage;
          searchimage = image;
          str = searchimage.split("\\");
          searchimage = str[str.length - 1];
          img = "https://cdn.kwiat.com/source-images/large/" + searchimage;
        } else {
          img = "";
        }
        return img;
      }
      const webImgName = (img) => img.replace(/ /g, "");
      const largeImgName = (img) => {
        var str = img.split("\\");
        return str[str.length - 1];
      };

      if (res.LargeImageName) {
        imgArr.push({
          original: showimage(res.LargeImageName),
          thumbnail: showimage(res.LargeImageName),
          imgName: largeImgName(res.LargeImageName),
        });
      }
      if (res.Shape) {
        imgArr.push({
          original: showShapeImage(res.Shape),
          thumbnail: showShapeImage(res.Shape),
          imgName: res.shape,
        });
      }
      //   if (res.EditorialVideo) {
      //     imgArr.push({
      //       thumbnail:
      //         "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
      //       original:
      //         "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
      //       embedUrl: res.EditorialVideo,
      //       // description: "Render custom slides (such as videos)",
      //       renderItem: this.renderVideo.bind(this),
      //     });
      //   }
      //   if (res.SerialVideoLink) {
      //     imgArr.push({
      //       thumbnail:
      //         "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
      //       original:
      //         "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
      //       embedUrl: res.SerialVideoLink,
      //       // description: "Render custom slides (such as videos)",
      //       renderItem: this.renderVideo.bind(this),
      //     });
      //   }
      //   if (res.StyleVideoLink) {
      //     imgArr.push({
      //       thumbnail:
      //         "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
      //       original:
      //         "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
      //       embedUrl: res.StyleVideoLink,
      //       // description: "Render custom slides (such as videos)",
      //       renderItem: this.renderVideo.bind(this),
      //     });
      //   }

      for (let i = 1; i < 6; i++) {
        var field = "WebImage" + i;
        if (res[field]) {
          imgArr.push({
            original: showWebImage(res[field]),
            thumbnail: showWebImage(res[field]),
            imgName: webImgName(res[field]),
          });
        }
      }
    }
    // console.log("imgArr : ", imgArr);
    return imgArr;
    // this.setState({
    //   imgArr: imgArr,
    // });
  }
  render() {
    let { item, handleItemToView, toggleSingleItem } = this.props;
    return (
      <div className="single_item_container">
        <div className="item_header_options">
          <h6>
            {item.SerialNumber && item.StyleNumber
              ? `${item.SerialNumber} | ${item.StyleNumber}`
              : item.SerialNumber
              ? item.SerialNumber
              : item.StyleNumber
              ? item.StyleNumber
              : ``}
          </h6>
          <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/add-to-basket.png"></img>
          <button
            onClick={() => {
              handleItemToView({});
              toggleSingleItem(false);
            }}
          >
            X
          </button>
        </div>
        <div className="single_item_description">{item.Description}</div>
        <div className="image_container">
          <ImageGallery
            items={this.handleImageGallery(item)}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            onErrorImageURL="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg"
            showThumbnails={false}
            showBullets={true}
          />
        </div>
        <div className="single_item_price">
          <label>
            {(item.RetailPrice &&
              currencyFormatter.format(`${item.RetailPrice}`, {
                code: "USD",
                precision: 0,
              })) ||
              ""}
          </label>{" "}
          USD
        </div>
        <div className="single_item_details"></div>
        <Table>
          <tbody>
            <tr>
              <td>Brand</td>
              <td>{item.Brand}</td>
            </tr>
            <tr>
              <td>ItemType</td>
              <td>{item.ItemType}</td>
            </tr>
            <tr>
              <td>ItemSubtype</td>
              <td>{item.ItemSubtype}</td>
            </tr>
            <tr>
              <td>Collection</td>
              <td>{item.Collection}</td>
            </tr>
            <tr>
              <td>SubCollection</td>
              <td>{item.SubCollection}</td>
            </tr>
            <tr>
              <td>Maker</td>
              <td>{item.Maker}</td>
            </tr>
            <tr>
              <td>Metal</td>
              <td>{item.Metal}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SingleItem;
