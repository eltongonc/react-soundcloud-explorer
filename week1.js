
var students = [
    {
        name: "sharkisha",
        cry: "nooo",
        genrateInfo: function(){
            return studenInfo(this)
        }
    },
    {
        name: "dr phil girl",
        cry: "cash me outside",
        genrateInfo: studenInfo(this)

    }
]


function studenInfo(studentValue) {
    console.log(studentValue);
}

students[1].genrateInfo()
