"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import Cookies from "js-cookie";

// Define AuthContext type
type AuthContextType = {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
  loggedInDoctor: any;
  setLoggedInDoctor: Dispatch<SetStateAction<any>>;
  registerState: boolean;
  setRegisterState: Dispatch<SetStateAction<boolean>>;
  allMyPatients: any;
  setAllMyPatients: Dispatch<SetStateAction<any>>;
  doctorLoginToken: any;
  setDoctorLoginToken: Dispatch<SetStateAction<any>>;
  hasPatients: boolean;
  setHasPatients: Dispatch<SetStateAction<boolean>>;
  currentPatient: any;
  setCurrentPatient: Dispatch<SetStateAction<boolean>>;
  isCurrentPatientSelected: boolean;
  setIsCurrentPatientSelected: Dispatch<SetStateAction<boolean>>;
  isPatientEdit: boolean;
  setIsPatientEdit: Dispatch<SetStateAction<boolean>>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const [registerState, setRegisterState] = useState<boolean>(false);
  const [loggedInDoctor, setLoggedInDoctor] = useState<any>([]);
  const [allMyPatients, setAllMyPatients] = useState<any>([]);
  const [doctorLoginToken, setDoctorLoginToken] = useState<any>();
  const [hasPatients, setHasPatients] = useState<boolean>(false);
  const [currentPatient, setCurrentPatient] = useState<any>();
  const [isCurrentPatientSelected, setIsCurrentPatientSelected] = useState<boolean>(false);
  const [isPatientEdit, setIsPatientEdit] = useState<boolean>(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    Cookies.remove("doctorToken");
    setRegisterState(false);
    setLoggedInDoctor([]);
    setAllMyPatients([]);
    setDoctorLoginToken(undefined);
    setHasPatients(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        login,
        logout,
        registerState,
        setRegisterState,
        loggedInDoctor,
        setLoggedInDoctor,
        allMyPatients,
        setAllMyPatients,
        doctorLoginToken,
        setDoctorLoginToken,
        hasPatients,
        setHasPatients,
        currentPatient,
        setCurrentPatient,
        isCurrentPatientSelected,
        setIsCurrentPatientSelected,
        isPatientEdit,
        setIsPatientEdit
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
