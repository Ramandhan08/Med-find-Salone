export interface Hospital {
  id: string
  name: string
  type: "Government" | "Private" | "NGO"
  district: string
  address: string
  phone: string
  emergencyServices: boolean
  services: string[]
  operatingHours: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export const hospitals: Hospital[] = [
  {
    id: "1",
    name: "Connaught Hospital",
    type: "Government",
    district: "Freetown",
    address: "Congo Cross, Freetown",
    phone: "+23222224711",
    emergencyServices: true,
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "Radiology", "ICU"],
    operatingHours: "24/7",
    coordinates: { lat: 8.4657, lng: -13.2317 },
  },
  {
    id: "2",
    name: "Princess Christian Maternity Hospital",
    type: "Government",
    district: "Freetown",
    address: "Brookfields, Freetown",
    phone: "+23276612345",
    emergencyServices: true,
    services: ["Maternity", "Neonatal Care", "Gynecology", "Family Planning", "Prenatal Care"],
    operatingHours: "24/7",
    coordinates: { lat: 8.4892, lng: -13.2282 },
  },
  {
    id: "3",
    name: "Ola During Children's Hospital",
    type: "Government",
    district: "Freetown",
    address: "Kissy Road, Freetown",
    phone: "+23230444401",
    emergencyServices: true,
    services: ["Pediatrics", "Emergency Care", "Vaccination", "Nutrition", "Child Surgery"],
    operatingHours: "24/7",
    coordinates: { lat: 8.4667, lng: -13.2167 },
  },
  {
    id: "4",
    name: "34 Military Hospital",
    type: "Government",
    district: "Freetown",
    address: "Wilberforce, Freetown",
    phone: "+23222240067",
    emergencyServices: true,
    services: ["Emergency Care", "Surgery", "Internal Medicine", "Outpatient", "Radiology"],
    operatingHours: "24/7",
    coordinates: { lat: 8.45, lng: -13.2167 },
  },
  {
    id: "5",
    name: "Choithram Memorial Hospital",
    type: "Private",
    district: "Freetown",
    address: "Hill Station, Freetown",
    phone: "+23222224040",
    emergencyServices: true,
    services: ["Emergency Care", "Surgery", "Cardiology", "Laboratory", "Pharmacy", "Radiology"],
    operatingHours: "24/7",
    coordinates: { lat: 8.45, lng: -13.2 },
  },
  {
    id: "6",
    name: "Mercy Hospital",
    type: "Private",
    district: "Freetown",
    address: "Wilkinson Road, Freetown",
    phone: "+23276515151",
    emergencyServices: true,
    services: ["General Medicine", "Surgery", "Maternity", "Laboratory", "Pharmacy"],
    operatingHours: "24/7",
    coordinates: { lat: 8.4833, lng: -13.2333 },
  },
  {
    id: "7",
    name: "Bo Government Hospital",
    type: "Government",
    district: "Bo",
    address: "Hospital Road, Bo",
    phone: "+23232270101",
    emergencyServices: true,
    services: ["Emergency Care", "Surgery", "Maternity", "Pediatrics", "TB Treatment", "Laboratory"],
    operatingHours: "24/7",
    coordinates: { lat: 7.9644, lng: -11.7383 },
  },
  {
    id: "8",
    name: "Kenema Government Hospital",
    type: "Government",
    district: "Kenema",
    address: "Hangha Road, Kenema",
    phone: "+23233660200",
    emergencyServices: true,
    services: ["Emergency Care", "Surgery", "Maternity", "Infectious Diseases", "Laboratory"],
    operatingHours: "24/7",
    coordinates: { lat: 7.8767, lng: -11.19 },
  },
  {
    id: "9",
    name: "Makeni Government Hospital",
    type: "Government",
    district: "Makeni",
    address: "Magburaka Road, Makeni",
    phone: "+23235221001",
    emergencyServices: true,
    services: ["Emergency Care", "Surgery", "Maternity", "HIV/AIDS Care", "TB Treatment"],
    operatingHours: "24/7",
    coordinates: { lat: 8.8858, lng: -12.0453 },
  },
  {
    id: "10",
    name: "Emergency Hospital (EMERGENCY)",
    type: "NGO",
    district: "Freetown",
    address: "Goderich, Freetown",
    phone: "+23276333000",
    emergencyServices: true,
    services: ["Emergency Care", "Surgery", "Trauma", "Critical Care", "ICU"],
    operatingHours: "24/7",
    coordinates: { lat: 8.4, lng: -13.3 },
  },
]

export const districts = ["All Districts", "Freetown", "Bo", "Kenema", "Makeni", "Koidu", "Port Loko", "Waterloo"]

export const hospitalTypes = ["All Types", "Government", "Private", "NGO"]
