import { connectDB } from "../../../../utils/mongoose";
import { NextResponse } from "next/server";
import Task from '../../../../models/Task';

export async function GET(request, {params}) {
  try {
    connectDB()
    const taskFound = await Task.findById(params.id)
  
    if(!taskFound) 
      return NextResponse.json({
        message: "Tarea no encontrada",
      }, {
        status: 404
      })
  
    return NextResponse.json(taskFound)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}

export async function DELETE(request, {params}) {
  try {
    const taskDelete = await Task.findByIdAndDelete(params.id)

    if(!taskDelete)
      return NextResponse.json({
        message: "Tarea no encontrada"
      },{
        status: 400
      })
    
      return NextResponse.json(taskDelete)
  } catch (error) {
    return NextResponse.json(error.message, {
      status:400
    })
  }
}

export async function PUT(request, {params}) {
  try {
    const data = await request.json()
    const updateTask = await Task.findByIdAndUpdate(params.id, data, {
      new: true
    })
    return NextResponse.json(updateTask)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 404
    })
  }
}