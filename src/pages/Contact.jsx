import React from "react";
import { SectionTitle } from "../components";
import { sendMail } from "../api/mail";
import { toast } from "react-toastify";
const Contact = () => {

  const handleSend = async (event) => {
    event.preventDefault()
    const target = event.target;

    const mailContent = {
      from: target[2].value,
      to: "bambushop.cadiz@gmail.com",
      subject: target[0].value + " - " + target[1].value + " - " + target[3].value,
      body: target[4].value,
    }

    const response = await sendMail(mailContent)
    if (response.ok) {
      toast.success("Mensaje enviado correctamente. ¡Nos pondremos en contacto contigo en breve!")
    } else {
      toast.error("Algo salió mal al mandar el correo: " + error)
    }
    document.getElementById("contact-form").reset()
  }

  return (
    <>
      <SectionTitle title="Contacta con nosotros" path="Inicio | Contacto" />
      <div className="isolate px-6 lg:px-8">
        <form
          id="contact-form"
          onSubmit={handleSend}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-accent-content"
              >
                Nombre
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-accent-content"
              >
                Apellidos
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-accent-content"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold leading-6 text-accent-content"
              >
                Teléfono
              </label>
              <div className="relative mt-2.5">
                <input
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-accent-content"
              >
                Mensaje
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <button
                  type="button"
                  className="bg-green-700 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  role="switch"
                  aria-checked="false"
                  aria-labelledby="switch-1-label"
                >
                  <span className="sr-only text-accent-content">Aceptar las políticas</span>

                  <span
                    aria-hidden="true"
                    className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  ></span>
                </button>
              </div>
              <label className="text-sm leading-6 text-accent-content" id="switch-1-label">
                Al seleccionar esto, aceptas nuestra
                <a href="#" className="font-semibold text-green-600">
                  &nbsp;política de&nbsp;privacidad
                </a>
                .
              </label>
            </div>
          </div>
          <div className="mt-10">
            <input
              type="submit"
              className="block w-full rounded-md bg-green-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              value="Hablemos"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
