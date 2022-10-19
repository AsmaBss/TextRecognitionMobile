import { gql } from '@apollo/client';

export const ADD_SONEDE = gql`
  mutation addSonede(
    $num: Int!
    $date: String!
    $topay: Float!
    $type: String!
    $status: String!
  ) {
    addSonede(
      num: $num
      date: $date
      topay: $topay
      type: $type
      status: $status
    ) {
      id
      num
      date
      topay
      type
      status
    }
  }
`;

export const UPDATE_SONEDE = gql`
  mutation updateTypeFacture(
    $numHeight: Float!
    $numWidth: Float!
    $numX: Float!
    $numY: Float!
    $dateHeight: Float!
    $dateWidth: Float!
    $dateX: Float!
    $dateY: Float!
    $topayHeight: Float!
    $topayWidth: Float!
    $topayX: Float!
    $topayY: Float!
    $id: Int!
  ) {
    updateTypeFacture(
      values: {
        numHeight: $numHeight
        numWidth: $numWidth
        numX: $numX
        numY: $numY
        dateHeight: $dateHeight
        dateWidth: $dateWidth
        dateX: $dateX
        dateY: $dateY
        topayHeight: $topayHeight
        topayWidth: $topayWidth
        topayX: $topayX
        topayY: $topayY
      }
      options: {id: $id}
    ) {
      id
      type
      numHeight
      numWidth
      numX
      numY
      dateHeight
      dateWidth
      dateX
      dateY
      topayHeight
      topayWidth
      topayX
      topayY
    }
  }
`;

export const GET_SONEDE = gql`
  query getAllFactureSonede {
    getAllFactureSonede {
      id
      num
      date
      topay
    }
  }
`;
