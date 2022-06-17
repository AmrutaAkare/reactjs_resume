import React, { useState } from 'react';
import {Grid,TextField,Typography,FormControlLabel,Checkbox,Button,Box,Alert,InputLabel,
    MenuItem,Select,FormControl,FormLabel,RadioGroup,Radio,FormGroup,Stack,Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow,Paper,Avatar} from '@mui/material';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import AdapterDateFns from '@mui/lab/AdapterDateFns';
  import { DatePicker } from  '@mui/x-date-pickers';
import {styled } from '@mui/material/styles';


function FirstPage() {
      
    const Input = styled('input')({
      display: 'none',
    });
     //state
     const [name, setName] = useState('')
     const[email,setEmail] =useState()
     const[dob,setDob] = useState(null)
     const[st, setSt] = useState('')
     const [gender, setGender] = useState()
     const[pjl,setpjl] =useState([])
     const[rdoc,setRdoc] = useState('')
     const[pimage, setimage] = useState('')
     const[error, setError] = useState({
      status: false,
      msg:"",
      type:" "

     })
    

     //multi Checkbox
     const getpjl = (e) => {
      let data=pjl
      data.push(e.target.value)
      setpjl(data)
     }

     //clear Form
     const resetForm = () =>{
      setName('')
      setEmail('')
      setDob(null)
      setSt('')
      setGender('')
      setpjl([])
      setimage('')
      setRdoc('')
      document.getElementById('resume-form').reset()
     }
     //handle Form Submission
     const handlSubmit = (e) =>{
      e.preventDefault();
      const data = new FormData()
      data.append('name',name)
      data.append('email',email)
      data.append('dob',dob)
      data.append('st',st)
      data.append('gender',gender)
      data.append('pjl',pjl)
      data.append('pimage',pimage)
      data.append('rdoc',rdoc)
      console.log(data)
      
      if(name && email) {
        console.log(data.get('name'))
        console.log(data.get('email'))
        console.log(data.get('dob'))
        console.log(data.get('st'))
        console.log(data.get('gender'))
        console.log(data.get('pjl'))
        console.log(data.get('pimage'))
        console.log(data.get('rdoc'))
        setError({ status:true, msg:"Resume Uploaded Successfully" , type: 'success'})
        // console.log(data)
        resetForm()
      }else{
      
     
      setError({ status:true, msg:"All Fields are Required" , type: 'error'})
    }
     }
    return (
      <>
    <Box display="flex " justifyContent="center" sx={{
      backgroundColor: 'lightblue', padding:2
    }}>
      <Typography variant='h2' component="div" sx={{fontWeight:'bold'}} >Resume Uploader</Typography>
    </Box>
    <Grid container justifyContent="center">
      <Grid item xs={5}>
        
      <Box component="form" sx={{p:3}} noValidate id="resume-form" onSubmit={handlSubmit}>
      <TextField id='name' name='name' required fullWidth margin='normal'  value={name || ''} label="Name" 
      onChange={(e) => setName(e.target.value)}/>
      <TextField id='email' email='name' required fullWidth margin='normal' value={email || ''} label="Email"
      onChange={(e) => setEmail(e.target.value)}/>
    
       <Box mt={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date Of Birth"
          value={dob}
          onChange={(newValue)=> {setDob(newValue) }}
          renderInput={(params) => <TextField {...params} />}
         />

        </LocalizationProvider>
       </Box>
       <FormControl fullWidth margin='normal'>
        <InputLabel id='state-select-label'>State</InputLabel>
        <Select labelId='state-select-label' id='state-select' value={st} label='st' onChange={(e) =>{setSt(e.target.value)}}>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
            <MenuItem value="Goa">Goa</MenuItem>
            <MenuItem value="Bihar">Bihar</MenuItem>
            <MenuItem value="madhyapradesh">Madhya Pradesh</MenuItem>
        </Select>
       </FormControl>
       <FormControl fullWidth margin='normal'>
        <FormLabel id='gender-radio' value={gender}>Gender</FormLabel>
        <RadioGroup row name="gender" aria-labelledby='gender-radio'>
         <FormControlLabel value="male" control={<Radio/>} label='Male'
         onChange={(e) => setGender(e.target.value)}/>
         <FormControlLabel value="female" control={<Radio/>} label='FeMale'
         onChange={(e) => setGender(e.target.value)}/>
         <FormControlLabel value="other" control={<Radio/>} label='Other'
         onChange={(e) => setGender(e.target.value)}/>
        </RadioGroup>
       </FormControl>
       <FormControl component='fieldset' fullWidth margin='normal'>
       <FormLabel component='legend'>Preferred Job Location?</FormLabel>
       <FormGroup row>
        <FormControlLabel control={<Checkbox/>}  label="Mumbai" value="Delhi"  onChange={(e) =>getpjl(e)} />
        <FormControlLabel control={<Checkbox/>}  label="Nagpur" value="Nagpur" onChange={(e) =>getpjl(e)} />
        <FormControlLabel control={<Checkbox/>}  label="Pune"   value="Pune"   onChange={(e) =>getpjl(e)}/>
        <FormControlLabel control={<Checkbox/>}  label="Nashik" value="Nashik" onChange={(e) =>getpjl(e)} />
       </FormGroup>
       </FormControl>
       <Stack direction="row" alignItems="center" spacing={4}>

        <label htmlFor='profile-photo'>
        <Input accept="image/*" id="profile-photo" type="file" onChange={(e) => { setimage(e.target.files[0]) }} />
        <Button variant='contained' component='span'>Upload Photo</Button>
        </label>
        <label htmlFor='resume-file'>
        <Input accept="doc/*" id="resume-file" type="file" onChange={(e) => { setRdoc(e.target.files[0]) }} />
        <Button variant='contained' component='span'>Upload File</Button>
        </label>
       </Stack>

       <Button type='submit' variant='contained' sx= {{mt:3, mb: 2, px:5}} color="error">SUBMIT</Button>
       {error.status ? <Alert severity = {error.type}> {error.msg}</Alert> : ''}
      

        </Box>
      </Grid>
      <Grid item xs={7}>
      <Box display="flex " justifyContent="center" sx={{
         backgroundColor: 'info.light',padding:1
    }}>
      <Typography variant='h5' component="div" align="center" sx={{fontWeight:'bold',color:'whitesmoke'}} >List of Candidate</Typography>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{minWidth:650}} arid-label="simple table">
      <TableHead> 
    <TableRow >
    <TableCell align="center">Name</TableCell>
    <TableCell align="center">Email</TableCell>
    <TableCell align="center">DOB</TableCell>
    <TableCell align="center">State</TableCell>
    <TableCell align="center">Gender</TableCell>
    <TableCell align="center">Profile</TableCell>
    <TableCell align="center">Avatar</TableCell>
    </TableRow >
   </TableHead>
   <TableBody >
    <TableRow sx={{ '&:last-child td, &:last-child th': {border:0 } }}>
    <TableCell align="center"> Sonam</TableCell>
    <TableCell align="center"> Sonam@gmail.com</TableCell>
    <TableCell align="center"> 20/10/1995</TableCell>
    <TableCell align="center"> pune</TableCell>
    <TableCell align="center"> Female</TableCell>
    <TableCell align="center"> Mumbai Thane</TableCell>
    <TableCell align="center"> <Avatar src="#"/></TableCell>
   
    </TableRow>
  </TableBody>
  </Table>
    </TableContainer>
    </Grid>
    </Grid>
      </>
    );
  }
  export default  FirstPage;