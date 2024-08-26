const productos = [
    {
      id: 1,
      nombre: "Campera Invierno",
      descripcion: "Campera acolchada ideal para invierno.",
      precio: 18000,
      imagen: "IMG/Camperas/Campera1.jpg",
      category: "Camperas"
    },
    {
      id: 2,
      nombre: "Campera de Cuero",
      descripcion: "Campera de cuero auténtico para un look elegante.",
      precio: 40000,
      imagen: "IMG/Camperas/Campera3.jpg",
      category: "Camperas"
    },
    {
        id: 3,
        nombre: "Campera de Cuero",
        descripcion: "Campera de cuero auténtico para un look elegante.",
        precio: 32000,
        imagen: "IMG/Camperas/Campera3.jpg",
        category: "Camperas"
      },
      {
        id: 4,
        nombre: "Campera de Cuero",
        descripcion: "Campera de cuero auténtico para un look elegante.",
        precio: 32000,
        imagen: "IMG/Camperas/Campera3.jpg",
        category: "Camperas"
      },
      {
        id: 5,
        nombre: "Campera de Cuero",
        descripcion: "Campera de cuero auténtico para un look elegante.",
        precio: 32000,
        imagen: "IMG/Camperas/Campera3.jpg",
        category: "Camperas"
      },
      {
        id: 6,
        nombre: "Campera de Cuero",
        descripcion: "Campera de cuero auténtico para un look elegante.",
        precio: 32000,
        imagen: "IMG/Camperas/Campera3.jpg",
        category: "Camperas"
      },
      {
        id: 7,
        nombre: "Campera de Cuero",
        descripcion: "Campera de cuero auténtico para un look elegante.",
        precio: 32000,
        imagen: "IMG/Camperas/Campera3.jpg",
        category: "Camperas"
      },
      {
        id: 8,
        nombre: "Campera de Cuero",
        descripcion: "Campera de cuero auténtico para un look elegante.",
        precio: 32000,
        imagen: "IMG/Camperas/Campera3.jpg",
        category: "Camperas"
      },
      {
        id: 9,
        nombre: "Campera de Cuero",
        descripcion: "Campera de cuero auténtico para un look elegante.",
        precio: 32000,
        imagen: "IMG/Camperas/Campera3.jpg",
        category: "Camperas"
      },
      {
        id: 10,
        nombre: "Campera de Cuero",
        descripcion: "Campera de cuero auténtico para un look elegante.",
        precio: 32000,
        imagen: "IMG/Camperas/Campera3.jpg",
        category: "Camperas"
      },
    {
      id: 11,
      nombre: "Parka Impermeable",
      descripcion: "Parka resistente al agua con capucha desmontable.",
      precio: 22000,
      imagen: "IMG/Parka/Parka1.jpg",
      category: "Parkas"
    },
    {
      id: 12,
      nombre: "Chaleco Reversible",
      descripcion: "Chaleco reversible con bolsillos frontales.",
      precio: 12000,
      imagen: "IMG/Chalecos/chaleco4.jpg",
      category: "Chalecos"
    },
    {
      id: 13,
      nombre: "Chaleco Reversible",
      descripcion: "Chaleco reversible con bolsillos frontales.",
      precio: 12000,
      imagen: "IMG/Chalecos/chaleco4.jpg",
      category: "Chalecos"
    },
    {
      id:14,
      nombre: "bufandon",
      descripcion: "Bufanda de lana suave, ideal para el invierno.",
      precio: 5000,
      imagen: "IMG/Accesorios/bufandon.jpg",
      category: "Accesorios"
    },
    {
      id: 15,
      nombre: "Gorro de Punto",
      descripcion: "Gorro de punto estilo casual.",
      precio: 3500,
      imagen: "IMG/Accesorios/accesorio.jpg",
      category: "Accesorios"
    },
   
  ]

  const productoEnPartes = (size) =>{
    let listaCompleta =[]
    for (let i=0; i < productos.length; i += size){
        listaCompleta.push(productos.slice(i, i+ size))
    }
    return listaCompleta
  }

  const miEstado ={
    productos: productoEnPartes(6),
    comienza:0,
    limiteDeProduct: productoEnPartes(6).length,
filtrado: null,
}
  