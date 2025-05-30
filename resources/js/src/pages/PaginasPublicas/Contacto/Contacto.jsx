import React from "react";
import "./ContactoStyle.css";
import phone_icon from "../../../assets/phone_icon.png";
import facebook_icon from "../../../assets/facebook_logo_icon.svg";
import mail_icon from "../../../assets/Email_icon.svg";
import instagram_icon from "../../../assets/instagram_logo_circle.svg";
import like_icon from "../../../assets/like_icon.svg";
import { LoadingComponente } from "../../../components/GenericLoadingComponent/LoadingComponent";

import { UseContacto } from "./useContacto";

export const Contacto = () => {


  const {handleInputChange,sendEmail, datosMensaje, isDisabled,loading,data,error} = UseContacto()

  
  return (
    <div className="contact-container">
      <h2 className="title">Contacto</h2>

      <div className="contact-items">
        <div className="box-wpp">
          <img src={phone_icon} alt="telefono" />
          <div className="text-box">11-3802-4906</div>
        </div>
        <div className="mail-box">
          <img src={mail_icon} alt="mail" />
          <div className="text-box">olivia_design@outlook.com</div>
        </div>
        <div className="box-redes">
          <img className="like" src={like_icon} alt="like" />
          <a
            href="https://www.instagram.com/disenos.oliviaok/?igsh=M2E5aXdrcHB3N3V4"
            target="blank"
          >
            <img
              className="instagram"
              src={instagram_icon}
              alt="instagram"
            />
          </a>
          <a
            href="https://www.facebook.com/Disenos.oliviaok?mibextid=ZbWKwL"
            target="blank"
          >
            <img className="facebook" src={facebook_icon} alt="facebook" />
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={sendEmail}>
        <div className="item-name">
          <div className="name-style">
            <label className="label-style">Nombre *</label>
            <input
              className="input-style"
              name="nombre"
              value={datosMensaje.nombre}
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div className="lastname-style">
            <label className="label-style">Apellido *</label>
            <input
              className="input-style"
              name="apellido"
              value={datosMensaje.apellido}
              onChange={handleInputChange}
              type="text"
            />
          </div>
        </div>
        <div className="item-mail">
          <label className="label-style">Email *</label>
          <input
            className="input-style"
            type="email"
            name="email"
            value={datosMensaje.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="item-mensaje">
          <label className="label-style">Mensaje *</label>
          <textarea
            className="textarea-style"
            name="mensaje"
            value={datosMensaje.mensaje}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="submit-button"
          type="submit"
          disabled={isDisabled}
          style={{
            backgroundColor: isDisabled ? "#dddddd" : "#FDC7E8",
            border: isDisabled ? "none" : "solid #FF5EC0 thin",
            cursor: isDisabled ? "auto" : "pointer",
          }}
        >
          Enviar
        </button>

        <div className="msjBox">
          {loading && (
            <div style={{ transition: "0.3s ease-in-out" }}>
              <LoadingComponente width={20} height={20} />
            </div>
          )}
          {data?.success === true && (
            <h2 style={{ transition: "0.3s", color: "#87AA96" }}>
              {data.mensaje}
            </h2>
          )}
          {error && (
            <h2 style={{ color: "#FF5E5E" }}>
              Ocurrió un error al enviar el mensaje.
            </h2>
          )}
        </div>
      </form>
    </div>
  );
};