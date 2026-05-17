import { ChevronDown, Loader, Mail } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SocialAuthButton from "../components/auth/SocialAuthButton";
import { motion, AnimatePresence } from "framer-motion";
import PasswordField from "../components/auth/PasswordField";
import { Link } from "react-router-dom";
import AnimatedInput from "../components/auth/AnimatedInput";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/features/authThunks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "User",
    },
  });
  const navigate = useNavigate();
  const roles = ["User", "Admin", "Co-Admin"];
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const wrapperRef = useRef(null);
  const userRef = useRef(null);
  const passRef = useRef(null);
  const conPassRef = useRef(null);
  const socialProviders = [
    {
      id: "google",
      icon: "/images/Auth/google.png",
      alt: "Google login",
      onClick: () => console.log("Google Login"),
    },
    {
      id: "github",
      icon: "/images/Auth/github.png",
      alt: "GitHub login",
      onClick: () => console.log("GitHub Login"),
    },
    {
      id: "facebook",
      icon: "/images/Auth/facebook.png",
      alt: "Facebook login",
      onClick: () => console.log("Facebook Login"),
    },
  ];

  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();

  const handleFocus = (ref) => {
    ref.current?.classList.add(
      "border-[#01509C]",
      "ring-2",
      "ring-[#01509C]/30",
    );
  };
  const handleBlur = (ref) => {
    ref.current?.classList.remove(
      "border-[#01509C]",
      "ring-2",
      "ring-[#01509C]/30",
    );
  };
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(registerUser(data)).unwrap();

      toast.success("Account created successfully");

      switch (res?.role || data?.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "Co-Admin":
          navigate("/co-admin");
          break;
        default:
          navigate("/user-dashboard");
      }
    } catch (err) {
      toast.error(err || "Registration failed");
    }
  };

  const onError = (errors) => {
    const firstError = Object.values(errors)[0];

    if (firstError?.message) {
      toast.error(firstError.message);
    } else {
      toast.error("Please fix the form errors");
    }

    console.log(errors);
  };

  return (
    <div
      className="bg-[radial-gradient(ellipse_60%_70%_at_center,#4a9df0_0%,#01509C_65%,#013b73_100%)]
 w-full min-h-screen flex items-center justify-center overflow-hidden  "
    >
      <motion.div
        className="relative flex items-center justify-center w-[90%] md:w-[80%] lg:w-3/4 page-2xl:w-1/2"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 1,
        }}
      >
        <div
          className="absolute -bottom-5 -right-6 md:-bottom-11 md:-right-11 z-20 size-20 md:size-25 rounded-full bg-linear-to-bl 
 from-[#868686] to-[#ECECEC]"
        />
        <div
          className="absolute -top-5 -left-6 md:-top-11 md:-left-11 z-20 size-20 md:size-25 rounded-full bg-linear-to-bl 
 from-[#0050FF] to-[#0040CC]"
        />
        <div className="rounded-4xl lg:rounded-r-none  relative z-100  w-full px-7 py-33.5 bg-[#ECECEC] hidden lg:flex flex-col items-center justify-center">
          <div className="bg-[#A6A6A621] border border-[#7B9CE242] h-95 w-2/3 rounded-4xl" />
          <div className="absolute z-60 -right-27 xl:top-15 2xl:top-1  2xl:-right-28 page-2xl:top-12 top-15 ">
            <img
              src="/images/Auth/signup.png"
              alt=""
              className="object-fill scale-65"
            />
          </div>
        </div>
        <div className="rounded-4xl lg:rounded-l-none z-80 py-5 px-10 xl:px-20 pr-5 xl:pr-15  w-full bg-[#2461E6] flex flex-col items-center justify-center">
          <h1 className="text-[#FFFFFF] text-2xl font-bold">Create Account</h1>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-2 w-full mt-1"
          >
            <div className="relative flex flex-col items-start justify-center gap-1.5 ">
              <label className="text-[#FFFFFF] text-base font-medium">
                Full Name
              </label>
              <div className="flex flex-col items-start justify-center w-full gap-1 ">
                <AnimatedInput
                  type="text"
                  name={"name"}
                  placeholder="John Doe"
                  iconType="user"
                  register={register}
                  wrapperRef={userRef}
                  label={"Full Name"}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                />
              </div>
            </div>
            <div className="relative flex flex-col items-start justify-center gap-1.5 ">
              <label className="text-[#FFFFFF] text-base font-medium">
                Email Address
              </label>
              <div className="flex flex-col items-start justify-center w-full gap-1 ">
                <AnimatedInput
                  type="email"
                  name={"email"}
                  placeholder="Email"
                  iconType="mail"
                  label={"Email"}
                  register={register}
                  wrapperRef={wrapperRef}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                />
              </div>
            </div>
            <div className="relative flex flex-col items-start justify-center w-full gap-1.5 ">
              <label className="text-[#FFFFFF] text-base font-medium">
                Password
              </label>
              <div className="flex flex-col items-start justify-center w-full gap-1 ">
                <PasswordField
                  name="password"
                  placeholder="Password"
                  register={register}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  passRef={passRef}
                  validation={{
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
                      message:
                        "Min 6 chars, 1 uppercase, 1 lowercase, 1 number & 1 special character required",
                    },
                  }}
                />
              </div>
            </div>

            <div className="relative flex flex-col items-start justify-center w-full gap-1.5 ">
              <label className="text-[#FFFFFF] text-base font-medium">
                Confirm Password
              </label>
              <div className="flex flex-col items-start justify-center w-full gap-1 ">
                <PasswordField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  register={register}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  passRef={conPassRef}
                  validation={{
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  }}
                />
              </div>
            </div>

            <div className="relative flex flex-col items-start justify-center w-full gap-1.5 ">
              <label className="text-[#FFFFFF] text-base font-medium">
                Role
              </label>
              <div className="w-full">
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <div ref={dropdownRef} className="relative">
                      {/* FIELD */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex cursor-pointer items-center justify-between
                         rounded-md border border-blue-600
                         bg-white px-4 py-2 text-sm w-full"
                      >
                        {/*  selected value shown */}
                        <span className="text-black">{field.value}</span>

                        <motion.span
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs text-black"
                        >
                          <ChevronDown />
                        </motion.span>
                      </motion.div>

                      {/* DROPDOWN */}
                      <AnimatePresence>
                        {open && (
                          <motion.ul
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-10 mt-1 w-full overflow-hidden
                             rounded-md border bg-white shadow-lg"
                          >
                            {roles.map((role) => (
                              <li
                                key={role}
                                onClick={() => {
                                  field.onChange(role);
                                  setOpen(false);
                                }}
                                className="cursor-pointer text-black px-4 py-2 text-sm
                                 hover:bg-blue-50"
                              >
                                {role}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                />
              </div>
            </div>
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 12px 25px rgba(0,0,0,0.25)",
              }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="relative flex items-start justify-center w-full mt-5 rounded-md bg-[#E3E3E3] py-2 px-3"
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ y: -1 }}
                whileTap={{ y: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="text-[#000000] font-bold text-lg"
              >
                {isLoading ? (
                  <Loader className="size-5 text-[#000000] animate-spin" />
                ) : (
                  " Create Account"
                )}
              </motion.button>
            </motion.div>
            <div className="flex relative items-center justify-center w-full top-2 ">
              <span className="h-0.5 bg-[#FFFFFF]  w-full" />
              <h1 className="absolute -top-2.5  bg-[#2461E6] px-2 text-white text-sm font-bold flex-1/3">
                OR
              </h1>
            </div>
            <div className="flex items-center justify-center w-full gap-4 mt-8 ">
              {socialProviders.map((provider) => (
                <SocialAuthButton
                  key={provider.id}
                  icon={provider.icon}
                  alt={provider.alt}
                  onClick={provider.onClick}
                />
              ))}
            </div>
            <div className="flex items-center justify-center w-full gap-1 ">
              <span className="text-[#FFFFFF] text-base font-semibold">
                Already have an account?{" "}
              </span>
              <Link
                to={"/sign-in"}
                className="flex items-center justify-center"
              >
                <span className="text-white hover:underline text-xl font-semibold">
                  {" "}
                  Login
                </span>
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
