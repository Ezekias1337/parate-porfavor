import fetchData from "../auth/fetchData";
import ROUTER_IP from "../../../constants/RouterIp";

// Define the response type (we'll check for status 200)
interface AddParentalControlMacResponse {
  status: number;
}

const addParentalControlMac = async (
  macAddress: string,
  description: string = "",
  templateInst: string = "1",
  token: string
): Promise<AddParentalControlMacResponse> => {
  const url = `${ROUTER_IP}/html/bbsp/parentalctrl/add.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.MAC&RequestFile=html/bbsp/parentalctrl/parentalctrlmac.asp`;

  /* 
    Need to find the file that provides the following code because it provides the list of devices
    that can be possibly added. This allows us to make sure that the value of our app matches what
    the router currently knows to be true.
    
    Comes from GET request to http://192.168.1.254/html/bbsp/common/parentalctrlinfo.asp, only
    requires cookie, no token required
    
    make sure to use this to populate a list of devices to display and allow the user to select
    
  function UserDevice(domain, MacAddr,HostName)
  {
  this.domain     = domain;
  this.MacAddr    = MacAddr;
  this.HostName   = HostName;
  }

  function ChildListClass(domain, MACAddress,Description,TemplateInst)
  {
  this.domain = domain;
  this.MACAddress = MACAddress;
  this.Description = Description;
  this.TemplateInst = TemplateInst;
  }


  function TemplatesListClass(domain,Name,UrlFilterPolicy,UrlFilterRight,StartDate,EndDate,DurationPolicy,DurationRight)
  {
  this.domain = domain;
  this.TemplateId = "";
  this.Name = Name;
  this.UrlFilterPolicy = UrlFilterPolicy;
  this.UrlFilterRight = UrlFilterRight;
  this.StartDate = StartDate;
  this.EndDate = EndDate;
  this.DurationPolicy = DurationPolicy;
  this.DurationRight = DurationRight;
  }

  function DurationListClass(domain, StartTime,EndTime,RepeatDay)
  {
  this.domain     = domain;
  this.TemplateId = "";
  this.StartTime  = StartTime;
  this.EndTime    = EndTime;
  this.RepeatDay  = RepeatDay;
  }

  function UrlValueClass(_Domain, _Url)
  {
  this.Domain = _Domain;
  this.Url = _Url;
  }

  function TimeShowClass(TemplateTime, TemplateRepeatDay)
  {
  this.TemplateTime = TemplateTime;
  this.TemplateRepeatDay = TemplateRepeatDay;
  }

  function BindShowClass(MACAddress, Description)
  {
  this.MACAddress = MACAddress;
  this.Description = Description;
  }

  function UrlShowClass(seq, UrlAddress)
  {
  this.seq = seq;
  this.UrlAddress = UrlAddress;
  }



  function StatsListClass(domain, PacketsBlockedByTime_High,PacketsBlockedByTime_Low,PacketsBlockedByUrl_High,PacketsBlockedByUrl_Low)
  {
  this.domain     = domain;
  this.TemplateId = "";
  this.PacketsBlockedByTime_High  = PacketsBlockedByTime_High;
  this.PacketsBlockedByTime_Low   = PacketsBlockedByTime_Low;
  this.PacketsBlockedByUrl_High   = PacketsBlockedByUrl_High;
  this.PacketsBlockedByUrl_Low    = PacketsBlockedByUrl_Low;
  }

  var UserDevicesListArray = new Array(new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.1","66\x3a46\x3ae0\x3a81\x3ac1\x3a61","Pixel\x2d7\x2dFrank"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.2","02\x3a0f\x3ab5\x3af1\x3a7f\x3a82","EX5000"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.3","4c\x3a24\x3ace\x3a41\x3a50\x3ab8",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.4","4c\x3acc\x3a6a\x3a05\x3a1e\x3a7c","linux\x2ddesktop"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.5","8e\x3a32\x3ad4\x3aea\x3ae8\x3a17","Pixel\x2d7\x2dFrank"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.6","98\x3a41\x3a5c\x3aab\x3a20\x3a63",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.7","58\x3a91\x3acf\x3a06\x3adc\x3a2e",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.8","58\x3a91\x3acf\x3a2c\x3ac6\x3a50",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.9","58\x3a91\x3acf\x3afc\x3a70\x3a2c",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.10","58\x3a91\x3acf\x3ac4\x3a2d\x3ad7",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.11","58\x3a91\x3acf\x3a84\x3a34\x3a13",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.12","58\x3a91\x3acf\x3abf\x3aed\x3aad",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.13","58\x3a91\x3acf\x3a4c\x3a94\x3a2f",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.14","58\x3a91\x3acf\x3ab1\x3a2e\x3a20",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.15","aa\x3ad0\x3a21\x3aed\x3a45\x3a9b","Pixel\x2d7\x2dFrank"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.16","26\x3ae6\x3a34\x3ab0\x3a28\x3a5d","Pixel\x2d7"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.17","58\x3a91\x3acf\x3a37\x3a49\x3a87",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.18","58\x3a91\x3acf\x3ab9\x3a2f\x3a8f",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.19","58\x3a91\x3acf\x3a92\x3aa6\x3a78",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.20","58\x3a91\x3acf\x3afb\x3ad2\x3a5c",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.21","0c\x3a62\x3aa6\x3aa4\x3ab2\x3afd","FrankLivingRoom"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.22","58\x3a91\x3acf\x3a9b\x3ab9\x3ac3",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.23","14\x3ac1\x3a4e\x3a0f\x3aba\x3a89","Chromecast"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.24","58\x3a91\x3acf\x3ab9\x3a28\x3a9d",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.25","58\x3a91\x3acf\x3a24\x3a46\x3a4d",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.26","58\x3a91\x3acf\x3a05\x3a96\x3adf",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.27","58\x3a91\x3acf\x3a7c\x3a77\x3ab9",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.28","58\x3a91\x3acf\x3ac7\x3ab4\x3a2d",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.29","58\x3a91\x3acf\x3a0d\x3a6c\x3a23",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.30","58\x3a91\x3acf\x3a7d\x3a22\x3a0b",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.31","f4\x3a96\x3a34\x3aa7\x3a45\x3a3b","linux\x2dlaptop"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.32","58\x3a91\x3acf\x3afd\x3a64\x3a44",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.33","ca\x3aa7\x3a9d\x3a04\x3a5b\x3a24","OnePlusNordN100"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.34","ea\x3a08\x3a05\x3afc\x3a0c\x3a48",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.35","5c\x3aad\x3a76\x3a24\x3a25\x3a4f","FrankLivingRoom"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.36","58\x3a91\x3acf\x3a84\x3a0f\x3a7d",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.37","58\x3a91\x3acf\x3a35\x3a81\x3a66",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.38","58\x3a91\x3acf\x3a7f\x3a66\x3a87",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.39","58\x3a91\x3acf\x3ab7\x3a7a\x3a85",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.40","58\x3a91\x3acf\x3abc\x3aeb\x3adf",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.41","9c\x3ae0\x3a63\x3a57\x3ae0\x3a12","Galaxy\x2dJ7\x2dPrime"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.42","58\x3a91\x3acf\x3ac6\x3a0f\x3aaf",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.43","58\x3a91\x3acf\x3a6e\x3ad1\x3adb",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.44","58\x3a91\x3acf\x3a30\x3aa7\x3a64",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.45","58\x3a91\x3acf\x3a5a\x3a40\x3a6d",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.46","46\x3a5f\x3aca\x3a4c\x3a4c\x3a6b","Vieja\x2dTelefono\x2dde\x2dAna"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.47","94\x3ae2\x3a3c\x3aae\x3ad7\x3a5b","LAPTOP\x2d3ROACRNM"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.48","58\x3a91\x3acf\x3a88\x3a4d\x3ae8","freddy\x2dlaptop"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.49","8e\x3a57\x3aa9\x3a33\x3a9b\x3aef","Pixel\x2d7\x2dFreddy"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.50","f6\x3a30\x3a75\x3a7f\x3a4d\x3af7","Vieja\x2dTelefono\x2dde\x2dAna"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.51","4c\x3acc\x3a6a\x3a91\x3aa3\x3ad4",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.52","42\x3a46\x3afc\x3ae6\x3ad7\x3a00","Pixel\x2d7\x2dFreddy"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.53","06\x3a19\x3ac1\x3ade\x3aec\x3a5d","Annie\x2dPixel\x2d7"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.54","86\x3acb\x3a40\x3a0e\x3a8e\x3aa6",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.55","f4\x3a96\x3a34\x3a27\x3a6f\x3afa",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.56","f4\x3a96\x3a34\x3ab8\x3a91\x3ac3",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.57","70\x3a8b\x3acd\x3a2e\x3a33\x3aa6",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.58","3e\x3a41\x3a50\x3a67\x3aaa\x3a6f",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.59","fa\x3ac2\x3ada\x3a4f\x3acf\x3ade","Galaxy\x2dA52"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.60","e6\x3a52\x3ac5\x3a61\x3ada\x3a25","ZTE\x2dBlade\x2dA54"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.61","f4\x3a96\x3a34\x3a4d\x3a93\x3acd",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.62","f4\x3a96\x3a34\x3a31\x3a99\x3aba",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.63","ac\x3ae2\x3ad3\x3a4d\x3aad\x3a0c","linux\x2dlaptop"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.64","3a\x3ae6\x3ad9\x3ac8\x3a71\x3a32","Monse"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.65","02\x3a0f\x3ab5\x3abe\x3a7f\x3ad2","Pixel\x2d7\x2dFrank"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.66","02\x3a0f\x3ab5\x3a2e\x3a2e\x3a1d",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.67","4a\x3aca\x3ab3\x3a25\x3a1b\x3a5f","Thomas\x2ds\x2dS21\x2dUltra"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.68","4c\x3acc\x3a6a\x3a35\x3af3\x3a87",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.69","4c\x3acc\x3a6a\x3af6\x3a14\x3a35",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.70","4c\x3acc\x3a6a\x3ada\x3af9\x3aed",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.71","4c\x3acc\x3a6a\x3a23\x3ae3\x3a62",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.72","4c\x3acc\x3a6a\x3aae\x3ad9\x3a57",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.73","4c\x3acc\x3a6a\x3ad0\x3ab7\x3a6b",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.74","90\x3a09\x3adf\x3ad3\x3a63\x3a8c","MXLT2834"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.75","a0\x3a00\x3a4c\x3adf\x3af2\x3a84",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.76","02\x3a0f\x3ab5\x3a2e\x3a33\x3aa6","linux\x2ddesktop"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.77","4c\x3acc\x3a6a\x3ac6\x3a33\x3a4b",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.78","2c\x3acf\x3a67\x3a69\x3a5f\x3a10","raspberrypi"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.79","4c\x3acc\x3a6a\x3a2b\x3a8f\x3a59",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.80","4c\x3acc\x3a6a\x3a94\x3a38\x3aea",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.81","4c\x3acc\x3a6a\x3a24\x3a68\x3ac4",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.82","4c\x3acc\x3a6a\x3a57\x3ad5\x3a03",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.83","4c\x3acc\x3a6a\x3a39\x3a17\x3acc",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.84","4c\x3acc\x3a6a\x3a30\x3a50\x3a2b",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.85","10\x3a2c\x3ab1\x3aa4\x3a16\x3a61",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.86","9a\x3a09\x3a09\x3a46\x3aac\x3a81","OnePlusNordN100"),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.87","4c\x3acc\x3a6a\x3a9a\x3aa9\x3ae6",""),new UserDevice("InternetGatewayDevice.LANDevice.1.X_HW_UserDev.88","82\x3acc\x3a9c\x3af0\x3a7f\x3a83",""),null);
  var UserDevicesListArrayNr = UserDevicesListArray.length - 1;

  var ChildListArray = new Array(null);
  var ChildListArrayNr = ChildListArray.length-1;

  var TemplatesListArray = new Array(new TemplatesListClass("InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.1","Turn\x20Devices\x20Off\x20at\x20Night","0","0","","","0","0"),null);
  var TemplatesListArrayNr = TemplatesListArray.length-1;
  for (var i = 0; i < TemplatesListArrayNr; i++)
  {
  var id = TemplatesListArray[i].domain.split(".");
  TemplatesListArray[i].TemplateId = id[id.length -1];
  }


  var DurationListArray = new Array(new DurationListClass("InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.1.Duration.1","04\x3a30","22\x3a00","7\x2c1\x2c2\x2c3\x2c4\x2c5\x2c6"),null);
  var DurationListArrayNr = DurationListArray.length-1;
  for (var i = 0; i < DurationListArrayNr; i++)
  {
  var id = DurationListArray[i].domain.split(".");
  DurationListArray[i].TemplateId = id[id.length -3];
  }

  var StatsListArray = new Array(new StatsListClass("InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.1.Stats","0","0","0","0"),null);
  for (var i = 0; i < StatsListArray.length -1; i++)
  {
  var id = StatsListArray[i].domain.split(".");
  StatsListArray[i].TemplateId = id[id.length -2];
  }

  function UrlFilterUrlAddress(_Domain, _UrlAddress)
  {
  this.Domain = _Domain;
  this.UrlAddress = _UrlAddress;
  }
  var UrlValueArrayAll = new Array(null);

  var FltsecLevel = 'Disable';

  function GetUserDevicesList()
  {
  return UserDevicesListArray;
  }

  function GetChildList()
  {
  return ChildListArray;
  }

  function GetFilterApplyRange()
  {
  var FilterApplyRange = "";
  if (ChildListArrayNr == 0)
  {
  FilterApplyRange = "SpecifiedDevice";
  return FilterApplyRange.toUpperCase();
  }
  else
  {
  for (var i = 0; i < ChildListArrayNr; i++)
  {
  if (ChildListArray[i].MACAddress.toUpperCase() == "FF:FF:FF:FF:FF:FF")
  {
  FilterApplyRange = "AllDevice";
  return FilterApplyRange.toUpperCase();
  }
  }
  FilterApplyRange = "SpecifiedDevice";
  return FilterApplyRange.toUpperCase();
  }
  }

  function GetTemplatesList()
  {
  return TemplatesListArray;
  }

  function GetDurationList()
  {
  return DurationListArray;
  }

  function GetStatsList()
  {
  return StatsListArray;
  }


  function GetUrlValueArray(templateId)
  {
  var selectDomain = "InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates." + templateId + '.';
  var UrlValueArray = new Array();
  for(var i = 0; i < UrlValueArrayAll.length - 1; i++){
  if( UrlValueArrayAll[i].Domain.indexOf(selectDomain) >= 0 ){
  UrlValueArray.push(UrlValueArrayAll[i]);
  }
  }
  return UrlValueArray;
  }

  function GetTemplateUrlEnable(templateId)
  {
  for (var i = 0; i < TemplatesListArrayNr; i++){
  if(templateId == TemplatesListArray[i].TemplateId){
  return (TemplatesListArray[i].UrlFilterRight == '0')?false:true;
  }
  }
  return false;
  }
  function GetFltsecLevel()
  {
  return FltsecLevel;
  }

  function getHeight(id)
  {
  var item = id;
  var height;
  if (item != null)
  {
  if (item.style.display == 'none')
  {
  return 0;
  }
  if (navigator.appName.indexOf("Internet Explorer") == -1)
  {
  height = item.offsetHeight;
  }
  else
  {
  height = item.scrollHeight;
  }
  if (typeof height == 'number')
  {
  return height;
  }
  return null;
  }

  return null;
  }




  */

  // Prepare the body with dynamic input values
  const body = `x.MACAddress=${encodeURIComponent(
    macAddress
  )}&x.Description=${encodeURIComponent(
    description
  )}&x.TemplateInst=${encodeURIComponent(
    templateInst
  )}&x.X_HW_Token=${encodeURIComponent(token)}`;

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Content-Type": "application/x-www-form-urlencoded",
    "Upgrade-Insecure-Requests": "1",
    Priority: "u=4",
  };

  const referrer = `${ROUTER_IP}/html/bbsp/parentalctrl/parentalctrlmac.asp`;

  const init: RequestInit = {
    method: "POST",
    body,
    headers,
    referrer,
    credentials: "include",
    redirect: "follow",
  };

  try {
    // Call fetchData with the correct return type
    const response = await fetchData(url, init);

    // Check if the response status is 200 OK
    if (response.status === 200) {
      return { status: response.status }; // Return the status code if 200
    } else {
      console.error("Request failed with status:", response.status);
      throw new Error(
        `Failed to add parental control MAC, status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error adding parental control MAC:", error);
    throw error; // Re-throw to handle it in the calling function if necessary
  }
};

export default addParentalControlMac;
