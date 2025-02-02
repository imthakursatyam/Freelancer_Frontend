import React from 'react';
import {
  Progress,
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

import { useToast } from '@chakra-ui/react'

const Form1 = ({skill, setSkill, exp, setExp, form, setForm}) => {
  const [show, setShow] = React.useState(false)
  const [expInput, setExpInput] = React.useState("");
  const [skillInput, setSkillInput] = React.useState("");
  const [title, setTitleInput] = React.useState("");
  const [desc, setDesInput] = React.useState("");

  const expOnChange = (e) => {
    setExpInput(e.target.value);
  }
  const skillOnChange = (e) => {
    setSkillInput(e.target.value);
  }

  const appendExp = () => {
    setExp((prev)=> [...prev, expInput]);
    setExpInput('');
  }
  const appendSkill = () => {
    setSkill((prev)=> [...prev, skillInput]);
    setSkillInput('');
  }
  const handleClick = () => setShow(!show)
  return (
    <>
     <Heading w="100%" size={"xl"} textAlign={'center'} fontWeight="bold" mb={"5%"}>
       Job Info
      </Heading>
      <Flex>
        <FormControl w={"50%"} mr="5%">
          <FormLabel fontWeight={'bold'}>
            Title
          </FormLabel>
          <Input bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md" value={form.title} onChange={(e) => setForm({...form, ["title"]:e.target.value})}  placeholder="Frontend Developer" />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel  fontWeight={'bold'}>
          Description
        </FormLabel>
        <Textarea value={form.desc} onChange={(e) => setForm({...form, ["desc"]:e.target.value})}  bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md"   type="text" />
      </FormControl>

      <FormControl>
        <FormLabel  fontWeight={'bold'} mt="2%">
          Skills
        </FormLabel>
        <Flex my={2}>
          <Input bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md"  value={skillInput} onChange={(e)=> skillOnChange(e)} w={"30%"} mr={2} type='text'/>
          <Button color={"white"} bg={"green.400"} mr={2} onClick={appendSkill}>Add</Button>
          <Button color={"white"} bg={"green.400"} onClick={() => setSkill([])}>Reset</Button>
        </Flex>
        <Textarea bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md" value={skill.map((e) => e)} disabled id="desc" type="text" />
      </FormControl>
      <FormControl>
      <FormLabel fontWeight={'bold'} mt="2%">
          Experience
        </FormLabel>
        <Flex my={2}>
          <Input bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md" value={expInput} onChange={(e)=> expOnChange(e)} w={"30%"} mr={2} type='text'/>
          <Button color={"white"} bg={"green.400"} mr={2} onClick={appendExp}>Add</Button>
          <Button color={"white"} bg={"green.400"} onClick={() => setExp([])}>Reset</Button>
        </Flex>
        <Textarea bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md" value={exp.map((e) => e)} disabled id="desc" type="text" />
      </FormControl>
    </>
  )
}

const Form2 = ({form, setForm}) => {
  return (
    <>
      <Heading w="100%" size={"xl"} textAlign={'center'} fontWeight="bold" mb={"5%"}>
        Location Info
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Country / Region
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          value={form.country}
          onChange={(e) => setForm({...form, ["country"]:e.target.value})}
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
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%">
          Landmark
        </FormLabel>
        <Input
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
          onChange={(e) => setForm({...form, ["landmark"]:e.target.value})}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
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
          onChange={(e) => setForm({...form, ["city"]:e.target.value})}
          value={form.city}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
          fontSize="sm"
          fontWeight="md"
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
          autoComplete="state"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          value={form.state}
          onChange={(e) => setForm({...form, ["state"]:e.target.value})}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="pincode"
          fontSize="sm"
          fontWeight="md"
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
          w="full"
          rounded="md"
          onChange={(e) => setForm({...form, ["pincode"]:e.target.value})}
          value={form.pincode}
        />
      </FormControl>
    </>
  )
}

const Form3 = ({form, setForm}) => {
  return (
    <>
      <Heading w="100%" size={"xl"} textAlign={'center'} fontWeight="bold" mb={"5%"}>
        Social Handles
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
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
              rounded="md"
              value={form.website}
              onChange={(e) => setForm({...form, ["website"]:e.target.value})}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="OtherInfo" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="sm"
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
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
            type="text"
            value={form.email}
            onChange={(e) => setForm({...form, ["otherInfo"]:e.target.value})}
          />
          <FormHelperText>
            
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  )
}

const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
  ]

export default function Multistep() {
  const toast = useToast()
  const [step, setStep] = React.useState(1)
  const [progress, setProgress] = React.useState(33.33);
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const [skill, setSkill] = React.useState([]);
  const [exp, setExp] = React.useState([]);
  const [form, setForm] = React.useState({title:"", desc:"", country:"", state:"", pincode:"", landmark:"", city:"", otherInfo:"", website:""});

  const handleOnSubmit = async () => {
    const finalForm = {title:form.title, desc:form.desc, address:(form.landmark+", "+form.city+", "+form.state+", "+form.country+", "+form.pincode), otherInfo:form.otherInfo, website:form.website, skill:skill, experience:exp}
    console.log(finalForm)
    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }
  return (
    <>
     
      <Box
        maxWidth={900}
        p={10}
        py={20}
        m="20px auto"
        className='bg-white rounded-md'
        
        as="form">
     
        {step === 1 ? <Form1 skill={skill} setSkill={setSkill} exp={exp} setExp={setExp} form={form} setForm={setForm} /> : step === 2 ? <Form2 form={form}  setForm={setForm} /> : <Form3 form={form} setForm={setForm} />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                isDisabled={step === 1}
                colorScheme="green"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 3) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 33.33)
                  }
                }}
                colorScheme="green"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleOnSubmit}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}