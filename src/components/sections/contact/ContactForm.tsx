'use client';

const inputClassName =
  'peer block w-full border-b border-[#121110]/20 bg-transparent py-3 font-sans text-sm text-[#121110] transition-colors focus:border-[#121110] focus:outline-none';

const labelClassName =
  'absolute left-0 top-3 font-sans text-[0.65rem] uppercase tracking-[0.15em] text-[#121110]/40 transition-all duration-300 peer-focus:-top-4 peer-focus:text-[0.55rem] peer-focus:text-[#121110] peer-valid:-top-4 peer-valid:text-[0.55rem]';

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-12" onSubmit={(event) => event.preventDefault()}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="group relative">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder=" "
            required
            className={inputClassName}
          />
          <label htmlFor="name" className={labelClassName}>
            Nom complet
          </label>
        </div>

        <div className="group relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder=" "
            required
            className={inputClassName}
          />
          <label htmlFor="email" className={labelClassName}>
            Adresse email
          </label>
        </div>
      </div>

      <div className="group relative">
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder=" "
          required
          className={inputClassName}
        />
        <label htmlFor="subject" className={labelClassName}>
          Sujet de votre demande
        </label>
      </div>

      <div className="group relative">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder=" "
          required
          className={`${inputClassName} resize-none`}
        />
        <label htmlFor="message" className={labelClassName}>
          Votre message
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="group relative inline-flex items-center justify-center overflow-hidden bg-[#121110] px-8 py-4 text-[#EAE8E3] transition-all duration-500 hover:bg-[#2A2826]"
        >
          <span className="relative z-10 font-sans text-[0.65rem] uppercase tracking-[0.25em]">
            Envoyer le message
          </span>
        </button>
      </div>
    </form>
  );
}