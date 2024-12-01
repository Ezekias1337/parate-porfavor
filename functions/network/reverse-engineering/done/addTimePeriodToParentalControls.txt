/* 
    Whole Day, Every Day
*/

await fetch(
  "http://192.168.1.254/html/bbsp/parentalctrl/add.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.2.Duration&y=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.2&RequestFile=html/ipv6/not_find_file.asp",
  {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      Priority: "u=0",
    },
    referrer:
      "http://192.168.1.254/html/bbsp/parentalctrl/parentalctrltime.asp?TemplateId=2&FlagStatus=EditTemplate",
    body: "x.StartTime=00:00&x.EndTime=23:59&x.RepeatDay=7,1,2,3,4,5,6&y.DurationRight=0&y.DurationPolicy=0&x.X_HW_Token=a8c719eb4a0bb5501a7f933124d1b95f529b27455addeb31",
    method: "POST",
    mode: "cors",
  }
);

/* {
	"x.StartTime": "00:00",
	"x.EndTime": "23:59",
	"x.RepeatDay": "7,1,2,3,4,5,6",
	"y.DurationRight": "0",
	"y.DurationPolicy": "0",
	"x.X_HW_Token": "a8c719eb4a0bb5501a7f933124d1b95f529b27455addeb31"
} */

/* 
    4:30 AM to 10:00 PM Every Day
*/

await fetch(
  "http://192.168.1.254/html/bbsp/parentalctrl/set.cgi?x=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.2.Duration.1&y=InternetGatewayDevice.X_HW_Security.ParentalCtrl.Templates.2&RequestFile=html/ipv6/not_find_file.asp",
  {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
      Priority: "u=0",
    },
    referrer:
      "http://192.168.1.254/html/bbsp/parentalctrl/parentalctrltime.asp?TemplateId=2&FlagStatus=EditTemplate",
    body: "x.StartTime=04:30&x.EndTime=22:00&x.RepeatDay=7,1,2,3,4,5,6&y.DurationRight=0&y.DurationPolicy=0&x.X_HW_Token=64fc8e9e3777f2207524522e43b7ee6ad69589c81ff941fb",
    method: "POST",
    mode: "cors",
  }
);

/* {
	"x.StartTime": "04:30",
	"x.EndTime": "22:00",
	"x.RepeatDay": "7,1,2,3,4,5,6",
	"y.DurationRight": "0",
	"y.DurationPolicy": "0",
	"x.X_HW_Token": "64fc8e9e3777f2207524522e43b7ee6ad69589c81ff941fb"
} */
