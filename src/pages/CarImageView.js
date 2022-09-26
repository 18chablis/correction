import React, { useEffect } from "react";
import { Container, FlexContainer, Main } from "../utils/Main";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { isEmpty } from "../utils/Utils";
import { DefaultButton } from "../utils/Action";
import { getCarImage } from "../actions/car.action";
import ImageRenderer from "../components/ImageRenderer";

const CarImageView = () => {
  const { carImage } = useSelector((state) => state.carReducer);

  const { id } = useParams();
  const history = useHistory();
  const GoBack = () => {
    history.goBack();
  };
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarImage(id));
  }, [id, dispatch]);
  return (
    <Main>
      <Container>
        <FlexContainer justifyContent="end" marginTop="1rem">
          <DefaultButton onClick={() => GoBack()} type="button" bgColor Color>
            <span>Go back</span>
          </DefaultButton>
        </FlexContainer>

        {/* {!isEmpty(carImage) && (
          <>
            {
              carImage.data.[0].picture && (
                <ImageRenderer
                  url={carImage.data.[0].picture}
                  thumb={carImage.data.[0].thumb}
                  width={carImage.data.[0].width}
                  height={carImage.data.[0].height}
                />
              )
            }
            {
              carImage.data.[0].picture_1 && (
                <ImageRenderer
                  url={carImage.data.[0].picture_1}
                  thumb={carImage.data.[0].thumb_1}
                  width={carImage.data.[0].width}
                  height={carImage.data.[0].height}
                />
              )
            }
            {
              carImage.data.[0].picture_2 && (
                <ImageRenderer
                  url={carImage.data.[0].picture_2}
                  thumb={carImage.data.[0].thumb_2}
                  width={carImage.data.[0].width}
                  height={carImage.data.[0].height}
                />
              )
            }
          </>
        )} */}
      </Container>
    </Main>
  );
};

export default CarImageView;
