// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { selectBook } from '../actions/index';
// import { bindActionCreators } from 'redux';
//
// class BookList extends Component {
//   renderList() {
//       return this.props.books.map((book, i) => {
//         return (
//           <li
//             onClick={() => this.props.selectBook(book) }
//             key={i}>{book.title}</li>
//         );
//       });
//   }
//
//   render() {
//     return (
//       <ul>
//         { this.renderList() }
//       </ul>
//     )
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     books: state.books
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({selectBook: selectBook}, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(BookList);
