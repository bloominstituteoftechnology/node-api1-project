import { StyledLoading } from "../../styles/StyledLoading";

export default function Spinner() {
    return (
        <StyledLoading>
          <Circles
          height="150"
          width="150"
          color="#royalblue"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /> 
        </StyledLoading>
    )
}