const Noposts = ({ posts }) => {
    return (
      <>
        {posts.length === 0 && <div>No posts to display</div>}
      </>
    );
  }
  
  export default Noposts;