const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handleSubmit} className='mt-3'>
      <div className='form-group mb-3'>
        <label className='form-label'> Your email</label>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group mb-3'>
        <label className='form-label'> Your password</label>
        <input
          type='password'
          className='form-control'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button disabled={!email || !password} className='btn btn-dark w-100'>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
