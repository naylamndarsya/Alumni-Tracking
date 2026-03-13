async function tambahAlumni() {

const nama = document.getElementById("nama").value
const prodi = document.getElementById("prodi").value
const tahun = document.getElementById("tahun").value

const { error } = await supabaseClient
.from("alumni")
.insert([
{
nama:nama,
prodi:prodi,
tahun:parseInt(tahun),
status:"Belum terlacak"
}
])

if(error){
console.log(error)
alert("Gagal tambah data")
return
}

loadAlumni()

}

async function updateTracking(){

let nama=document.getElementById("trackNama").value
let perusahaan=document.getElementById("perusahaan").value
let jabatan=document.getElementById("jabatan").value
let lokasi=document.getElementById("lokasi").value

const { error } = await supabaseClient
.from("alumni")
.update({
status:"Terlacak",
perusahaan:perusahaan,
jabatan:jabatan,
lokasi:lokasi
})
.eq("nama",nama)

if(error){
console.log(error)
alert("Update gagal")
return
}

loadAlumni()

}

async function loadAlumni(){

let data = await getAlumni()

let keyword = document.getElementById("search").value.toLowerCase()

if(keyword){
data = data.filter(a =>
a.nama.toLowerCase().includes(keyword)
)
}

let table=document.getElementById("alumniTable")

table.innerHTML=""

data.forEach(a=>{

table.innerHTML+=`

<tr>

<td>${a.nama}</td>
<td>${a.prodi}</td>
<td>${a.tahun}</td>
<td>${a.status}</td>
<td>${a.perusahaan ?? "-"}</td>
<td>${a.jabatan ?? "-"}</td>
<td>${a.lokasi ?? "-"}</td>

<td>

<button onclick="editAlumni(${a.id})"
class="bg-yellow-400 px-2 py-1 rounded">
Edit
</button>

<button onclick="hapusAlumni(${a.id})"
class="bg-red-500 text-white px-2 py-1 rounded">
Hapus
</button>

</td>

</tr>

`

})

}

async function hapusAlumni(id){

await deleteAlumni(id)

loadAlumni()

}

async function editAlumni(id){

let nama = prompt("Nama baru")
let prodi = prompt("Prodi baru")
let tahun = prompt("Tahun lulus")
let status = prompt("Status (Terlacak / Belum terlacak)")
let perusahaan = prompt("Perusahaan")
let jabatan = prompt("Jabatan")
let lokasi = prompt("Lokasi")

await updateAlumni(id,{
nama:nama,
prodi:prodi,
tahun:parseInt(tahun),
status:status,
perusahaan:perusahaan,
jabatan:jabatan,
lokasi:lokasi
})

loadAlumni()

}

loadAlumni()