import {
  FlexContainer,
  FormInput,
  FormLabel,
  InlineInputContainer,
  SelectContainer,
  StyledOption,
} from "../../utils/Main";
import {
  portOfDestinationOptions,
  shippingLineOptions,
} from "../../utils/Options";

const Shipping = (props) => {
  return (
    <>
      <FlexContainer justifyContent="space-around">
        <InlineInputContainer>
          <FormLabel>Port of destination</FormLabel>
          <FormInput
            value={props.port_of_destination}
            onChange={(e) => props.setPortDestination(e.target.value)}
            type="text"
            placeholder="Charle De Gaule"
            list="port_of_destination"
          />
          <datalist id="port_of_destination">
            {portOfDestinationOptions.map((option) => (
              <StyledOption  key={option.value} value={option.value}>
                {option.label}
              </StyledOption>
            ))}
          </datalist>
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Container number</FormLabel>
          <FormInput
            value={props.container_number}
            onChange={(e) => props.setContainerNumber(e.target.value)}
            type="text"
            placeholder="G09L-7AW"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Booking Number</FormLabel>
          <FormInput
            value={props.booking_number}
            onChange={(e) => props.setBookingNumber(e.target.value)}
            type="text"
            placeholder="P0-09I"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Deposit Amount</FormLabel>
          <FormInput
            value={props.deposit}
            onChange={(e) => props.setDeposit(e.target.value)}
            type="text"
            placeholder="742.44"
          />
        </InlineInputContainer>
      </FlexContainer>
      <FlexContainer justifyContent="space-around">
        <InlineInputContainer>
          <FormLabel>Price</FormLabel>
          <FormInput
            value={props.price}
            onChange={(e) => props.setPrice(e.target.value)}
            type="text"
            placeholder="360"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Arrived Date</FormLabel>
          <FormInput
            value={props.arrive_date}
            onChange={(e) => props.setArriveDate(e.target.value)}
            type="date"
            placeholder="2020/09/21"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Shipping Line</FormLabel>
          <SelectContainer onChange={props.handleShippingLine}>
            {shippingLineOptions.map((option) => (
              <StyledOption key={option.value} value={option.value}>
                {option.label}
              </StyledOption>
            ))}
          </SelectContainer>
        </InlineInputContainer>
      </FlexContainer>
      <FlexContainer justifyContent="space-around">
        <InlineInputContainer>
          <FormLabel>Client Cut-off Date</FormLabel>
          <FormInput
            value={props.client_cut_off_date}
            onChange={(e) => props.setClientCutOffDate(e.target.value)}
            type="date"
            placeholder="2020/09/21"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Departure Date</FormLabel>
          <FormInput
            value={props.departure_date}
            onChange={(e) => props.setDepartureDate(e.target.value)}
            type="date"
            placeholder="2020/09/21"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Normal Cut-off Date</FormLabel>
          <FormInput
            value={props.normal_cut_off_date}
            onChange={(e) => props.setNormalCutOffDate(e.target.value)}
            type="date"
            placeholder="2020/09/21"
          />
        </InlineInputContainer>
      </FlexContainer>
      <FlexContainer justifyContent="space-between">
        <InlineInputContainer>
          <FormLabel>Document</FormLabel>
          <FormInput
            type="file"
            placeholder="Input a document"
            onChange={(e) => props.setDocFile(e.target.files[0])}
            accept=".pdf, .jpg, .jpeg, .png .txt, .doc, .docx"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Document</FormLabel>
          <FormInput
            type="file"
            placeholder="Input a document"
            onChange={(e) => props.setDocFile_1(e.target.files[0])}
            accept=".pdf, .jpg, .jpeg, .png .txt, .doc, .docx"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Document</FormLabel>
          <FormInput
            type="file"
            placeholder="Input a document"
            onChange={(e) => props.setDocFile_2(e.target.files[0])}
            accept=".pdf, .jpg, .jpeg, .png .txt, .doc, .docx"
          />
        </InlineInputContainer>
        <InlineInputContainer>
          <FormLabel>Document</FormLabel>
          <FormInput
            type="file"
            placeholder="Input a document"
            onChange={(e) => props.setDocFile_3(e.target.files[0])}
            accept=".pdf, .jpg, .jpeg, .png .txt, .doc, .docx"
          />
        </InlineInputContainer>
      </FlexContainer>
    </>
  );
};

export default Shipping;
