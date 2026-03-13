async function getAlumni(){

const { data } = await supabaseClient
.from("alumni")
.select("*")

return data

}

async function insertAlumni(data){

await supabaseClient
.from("alumni")
.insert([data])

}

async function deleteAlumni(id){

await supabaseClient
.from("alumni")
.delete()
.eq("id",id)

}

async function updateAlumni(id,data){

await supabaseClient
.from("alumni")
.update(data)
.eq("id",id)

}