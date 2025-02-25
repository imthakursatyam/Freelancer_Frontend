import React from 'react';
import {
  Progress,
  Badge,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Stepper,
  StepIndicator,
  StepNumber,
  StepIcon,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
  Step,
  useSteps,
  Highlight,
} from '@chakra-ui/react'
import { IoIosClose } from "react-icons/io";
import { useToast } from '@chakra-ui/react'


const ArrayFields = ({ name, arr, setArr, deleteItem }) => {
  const [input, setInput] = React.useState('');


  return <div className="col-span-full">
    <label htmlFor={`${name}`} className="block  text-md/6 font-bold font-medium text-gray-900">
      {name}
    </label>
    <div className="mt-2">
      <Flex my={2}>
        <Input bg="gray.50"
          _dark={{
            bg: 'gray.800',
          }}
          color="gray.500"
          rounded="md" value={input} onChange={(e) => setInput(e.target.value)} size={'sm'} w={"30%"} mr={2} type='text' />
        <Button onClick={input.length > 0 ? () => { setArr([...arr, input]); setInput("") } : () => { }} size={'sm'} color={"white"} bg={"green.400"} mr={2} >Add</Button>
        <Button onClick={() => { setArr([]) }} size={'sm'} color={"white"} bg={"green.400"} >Reset</Button>
      </Flex>
      <div className='w-full flex bg-gray-50 rounded-md  p-3 min-h-16 max-h-60 '>
        {arr.length > 0 && arr.map((item, idx) => {
          return <Badge key={idx} ml='1' className='max-h-5 ' colorScheme='green'>
            {item} <IoIosClose onClick={() => deleteItem(idx, arr, setArr)} className='inline text-lg mb-0.5 cursor-pointer' />
          </Badge>
        })}

      </div>
    </div>
    <p className="mt-3 text-xs/6 text-gray-600">Tip: (Use Shift + BackSpace) for backward cursor</p>
  </div>

}



export default function Multistep() {
  const toast = useToast();
  const [spin, setSpin] = React.useState(false);
  const [skill, setSkill] = React.useState([]);
  const [exp, setExp] = React.useState([]);
  const [form, setForm] = React.useState({ title: "", desc: "", country: "", state: "", pincode: "", landmark: "", city: "", otherInfo: "", website: "" });


  
const deleteItem = (idx, arr, setArr) => {
  const newArr = arr.filter((item, index) => index !== idx);
  setArr(newArr);
}

  const handleOnSubmit = async () => {
    try {
      setSpin(true);
      const { title, desc, otherInfo, website, country, state, pincode, landmark, city } = form;
      let headersList = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
  
      let bodyContent = JSON.stringify({
        "title": title,
        "desc": desc,
        "otherInfo": otherInfo,
        "website": website,
        "skill": skill,
        "exp": exp,
        "address": {
          "country": country,
          "state": state,
          "pincode": pincode,
          "landmark": landmark,
          "city": city,
        }
      });
  
      let response = await fetch("http://localhost:8080/recruiter/addJobPost", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
        credentials: "include"
      });
  
      let data = await response.json();
      setSpin(false);
      if (data.success) {
        toast({
          title: 'JobPost',
          description: data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'JobPost',
          description: data.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
      setForm({ title: "", desc: "", country: "", state: "", pincode: "", landmark: "", city: "", otherInfo: "", website: "" });
      setExp([]);
      setSkill([]);
    } catch (error) {
      setSpin(false);
      toast({
        title: 'JobPost',
        description: "Some Error Occurred",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
   
  }
  return (
    <>
      <Box maxWidth={900} className='mx-auto'>
        <Heading className='text-left mt-20 p-4'>Add New JobPost</Heading>
      </Box>

      <Box
        maxWidth={900}
        p={10}
        className='shadow-none  border-t-2 mx-auto mb-16 border-b-2'
        as="form">

        <Flex>
          <FormControl w={"50%"} mr="5%">
            <FormLabel
              fontSize="sm"
              fontWeight="bold"
              color="gray.700"
              _dark={{
                color: 'gray.50',
              }}
              mt="2%">
              Title
            </FormLabel>
            <Input focusBorderColor="brand.400"
              shadow="sm"
              size="sm" fontWeight="bold" bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md" value={form.title} onChange={(e) => setForm({ ...form, ["title"]: e.target.value })} placeholder="" />
          </FormControl>
        </Flex>
        <FormControl mt="2%">
          <FormLabel fontSize="sm"
            fontWeight="bold"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
            mt="2%">
            Description
          </FormLabel>
          <Textarea value={form.desc} onChange={(e) => setForm({ ...form, ["desc"]: e.target.value })} bg="gray.50"
            _dark={{
              bg: 'gray.800',
            }}
            color="gray.500"
            rounded="md" type="text" />
        </FormControl>

        <FormControl className='mt-6'>
          <ArrayFields name="Skills" arr={skill} setArr={setSkill} deleteItem={deleteItem} />
        </FormControl>
        <FormControl className='mt-6 mb-6 pb-8 border-b-2'>
          <ArrayFields name="Experience" arr={exp} setArr={setExp} deleteItem={deleteItem} />
        </FormControl>

        <FormControl className='mb-6' as={GridItem} colSpan={[6, 3]}>
          <FormLabel
            htmlFor="country"
            fontSize="sm"
            fontWeight="bold"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Country / Region
          </FormLabel>
          <Select
            bg="gray.50"
            id="country"
            name="country"
            autoComplete="country"
            placeholder="Select option"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            value={form.country}
            onChange={(e) => setForm({ ...form, ["country"]: e.target.value })}
            rounded="md">
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            <option>India</option>
          </Select>
        </FormControl>

        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="landmark"
            fontSize="sm"
            fontWeight="bold"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
            mt="2%">
            Landmark
          </FormLabel>
          <Input
            bg="gray.50"
            type="text"
            name="landmark"
            id="landmark"
            autoComplete="landmark"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={form.landmark}
            onChange={(e) => setForm({ ...form, ["landmark"]: e.target.value })}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
          <FormLabel
            htmlFor="city"
            fontSize="sm"
            fontWeight="bold"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
            mt="2%">
            City
          </FormLabel>
          <Input
            type="text"
            name="city"
            id="city"
            autoComplete="city"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            bg="gray.50"
            onChange={(e) => setForm({ ...form, ["city"]: e.target.value })}
            value={form.city}
          />
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
          <FormLabel
            htmlFor="state"
            fontSize="sm"
            fontWeight="bold"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
            mt="2%">
            State / Province
          </FormLabel>
          <Input
            type="text"
            name="state"
            id="state"
            bg="gray.50"
            autoComplete="state"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={form.state}
            onChange={(e) => setForm({ ...form, ["state"]: e.target.value })}
          />
        </FormControl>

        <FormControl className='pb-6 border-b-2 ' as={GridItem} colSpan={[6, 3, null, 2]}>
          <FormLabel
            htmlFor="pincode"
            fontSize="sm"
            fontWeight="bold"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
            mt="2%">
            Pincode
          </FormLabel>
          <Input
            type="number"
            name="pincode"
            id="pincode"
            autoComplete="pincode"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            bg="gray.50"
            w="full"
            rounded="md"
            mb={6}
            onChange={(e) => setForm({ ...form, ["pincode"]: e.target.value })}
            value={form.pincode}
          />
        </FormControl>


        <SimpleGrid columns={1} spacing={6}>
          <FormControl className='mt-6' as={GridItem} colSpan={[3, 2]}>
            <FormLabel
              fontSize="sm"
              fontWeight="bold"
              color="gray.700"
              _dark={{
                color: 'gray.50',
              }}>
              Website
            </FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon
                bg="gray.50"
                _dark={{
                  bg: 'gray.800',
                }}
                color="gray.500"
                rounded="md" >
                http://
              </InputLeftAddon>
              <Input
                type="tel"
                placeholder="www.example.com"
                focusBorderColor="brand.400"
                bg="gray.50"
                rounded="md"
                value={form.website}
                onChange={(e) => setForm({ ...form, ["website"]: e.target.value })}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="OtherInfo" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="bold"
              color="gray.700"
              _dark={{
                color: 'gray.50',
              }}>
              Other Info
            </FormLabel>
            <Textarea
              placeholder="Any Info or suggestion for freelancers"
              rows={3}
              shadow="sm"
              bg="gray.50"
              focusBorderColor="brand.400"
              fontSize={{
                sm: 'sm',
              }}
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, ["otherInfo"]: e.target.value })}
            />
            <FormHelperText>

            </FormHelperText>
          </FormControl>
        </SimpleGrid>

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Button
                isLoading={spin}
                loadingText="Submitting"
                spinnerPlacement='end'       
                className='px-4'
                colorScheme="green"
                variant="solid"
                onClick={handleOnSubmit}>
                Submit
              </Button>
      
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}