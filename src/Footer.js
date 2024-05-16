
/* This will create a new Date object representing the current date and time */

const Footer = ({length}) => {
    const today = new Date();
  return (
    <footer>
      <p> I HAVE {length} {length === 1 ? " Item": ' Items'}</p>
<p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
/* This code creates a new Date object representing the current date and time, and then it uses the getFullYear() method to extract the year.  */
  )
}

export default Footer
