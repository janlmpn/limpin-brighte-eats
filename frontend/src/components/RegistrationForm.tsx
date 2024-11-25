import { useState } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { GET_SERVICES, GET_LEAD_BY_EMAIL } from '../graphql/queries';
import { INSERT_LEAD, } from '../graphql/mutations';

const formStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2rem auto;
  padding: 0 2rem;
  border-radius: 12px;

  label {
    margin-bottom: 0.75rem;
    font-weight: 500;
    font-size: 1.2rem;
  }

  input {
    font-size: 1.1rem;
    padding: 0.75rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input:focus {
    outline: none;
    border-color: #0070f3;
  }

  button {
    font-size: 1.1rem;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
    background-color: #0070f3;
    color: white;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #005bb5;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .checkbox-group {
    margin-bottom: 1.5rem;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
    margin-top: 0.75rem;
  }

  .checkbox-item input {
    margin-right: 0.75rem;
    margin-bottom: unset;
    width: unset;
  }

  .checkbox-item label {
    margin-bottom: unset;
  }

  @media (max-width: 600px) {
    padding: 1rem;

    label {
      font-size: 1rem;
    }

    input,
    button {
      font-size: 1rem;
    }
  }
`;

const errorStyles = css`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    postcode: '',
    services: [] as string[], // Selected services
  });
  const [errors, setErrors] = useState<{ 
    email?: string; 
    mobile?: string; 
    services?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Fetch available services
  const { data: servicesData, loading: servicesLoading, error: servicesError } = useQuery(GET_SERVICES);
  const [ checkEmail ] = useLazyQuery(GET_LEAD_BY_EMAIL);
  const [insertLead] = useMutation(INSERT_LEAD);

  const validateForm = async () => {
    const newErrors: { email?: string; mobile?: string; services?: string;} = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    } else {
      // Validate if email exists
      const { data } = await checkEmail({ variables: { email: formData.email } });
      if (data?.leadByEmail) {
        newErrors.email = 'Email already exists.';
      }
    }

    if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must contain only digits.';
    }

    if(formData.services.length === 0){
      newErrors.services = 'Please select at least one from the services.';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((service) => service !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await validateForm()) {
      setIsSubmitting(true);
      try {
        await insertLead({
          variables: {
            ...formData,
          },
        });
        navigate('/thank-you');
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form css={formStyles} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        autoComplete='off'
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        autoComplete='off'
      />
      {errors.email && <div css={errorStyles}>{errors.email}</div>}

      <label htmlFor="mobile">Mobile</label>
      <input
        id="mobile"
        name="mobile"
        type="number"
        value={formData.mobile}
        onChange={handleChange}
        required
        autoComplete='off'
      />
      {errors.mobile && <div css={errorStyles}>{errors.mobile}</div>}

      <label htmlFor="postcode">Postcode</label>
      <input
        id="postcode"
        name="postcode"
        type="text"
        value={formData.postcode}
        onChange={handleChange}
        required
        autoComplete='off'
      />

      <div className="checkbox-group">
        <label>Services</label>
        {servicesLoading ? (
          <p>Loading services...</p>
        ) : servicesError ? (
          <p>Error loading services</p>
        ) : (
          servicesData?.services.map((service: { id: string; name: string }) => (
            <div key={service.id} className="checkbox-item">
              <input
                id={`service-${service.id}`}
                type="checkbox"
                name="services"
                value={service.id}
                onChange={handleChange}
              />
              <label htmlFor={`service-${service.id}`}>{service.name}</label>
            </div>
          ))
        )}
        {errors.services && <div css={errorStyles}>{errors.services}</div>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default RegistrationForm;