import React, {useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import parse from 'html-react-parser'
import styles from './Publications.module.css'
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Container from '@material-ui/core/Container'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { ApprovedIcon, PendingIcon  } from '../StatusIcons/StatusIcons';

import { deletePost } from '../../actions/posts'
import { getPostsByUser } from '../../actions/posts';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),

  },
}));

function TablePaginationActions(props) {

  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles(theme => ({
  table: {
    minWidth: 500,
  },

  tablecell: {
    fontSize: '16px'
}
}));


const Publications = ({ setOpen, setCurrentId, publications, currentId }) => {
    
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);

  // REMOVE PAGINATION IF NUMBER OF POSTS IS LESSTHAN 5
  const [rowsPerPage, setRowsPerPage] = useState(publications.length);

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
   // eslint-disable-next-line 
   const [openSnackbar, closeSnackbar] = useSnackbar()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
    dispatch(getPostsByUser(user?.result?.email));
      // eslint-disable-next-line
  },[location])



  const rows = publications
 
 
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleEdit = (id) => {
    setOpen((prevState) => !prevState)
    setCurrentId(id)
  }

  const openPost =(slug) => history.push(`/publications/${slug}`)




  return (
    <div className={styles.pageLayout}>

    <Container >
        
        <TableContainer component={Paper} elevation={0}>
      <Table className={classes.table} aria-label="custom pagination table">

      <TableHead>
          <TableRow>
            <TableCell style={{fontSize: 18 }}>Author</TableCell>
            <TableCell style={{fontSize: 18 }}>Year</TableCell>
            <TableCell style={{fontSize: 18 }}>Title</TableCell>
            <TableCell style={{fontSize: 18 }}>Journal</TableCell>
            <TableCell style={{fontSize: 18 }}>Status</TableCell>
            <TableCell style={{fontSize: 18 }}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row._id} styel={{cursor: 'pointer'}} >
              {/* <TableCell style={{cursor: 'pointer'}} onClick={() => openPost(row._id)} >{row.authors.map((author) => (<span key={author}>{author}, </span>))}</TableCell> */}
              <TableCell style={{cursor: 'pointer'}} onClick={() => openPost(row.slug)} >{row.author}</TableCell>
              <TableCell style={{cursor: 'pointer'}} onClick={() => openPost(row.slug)} >{row.year}</TableCell>
              <TableCell style={{cursor: 'pointer'}} onClick={() => openPost(row.slug)} > {parse(row.title)} <a style={{color: 'blue'}} href={row.doi} target="_blank" rel="noreferrer" >[DOI]</a></TableCell>
              <TableCell style={{cursor: 'pointer'}} onClick={() => openPost(row.slug)} >{row.journal}</TableCell>
              <TableCell >{row.isApproved ? <ApprovedIcon /> : <PendingIcon />}</TableCell>
              <TableCell >
                  <IconButton onClick={() => {handleEdit(row._id)}}>
                    <BorderColorIcon  />
                  </IconButton>
                  <IconButton onClick={() => dispatch(deletePost(row._id, openSnackbar))}>
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
              </TableCell>
              
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        {rows.length > 4 && (
          <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        )}
      </Table>
    </TableContainer>
    </Container>
    </div>
  );
}

export default Publications

