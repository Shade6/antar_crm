

exports.logs_entry = async (data,options,action,module_name,Module) => {
  try {

    const find_tracker_id = options.tracker_id
    const ActivityLogTracker = Module.models.activity_log_tracker
    const ActivityLog = Module.models.activity_log

    console.log(data,'===========')

    if(!find_tracker_id){
        return false;
    }
    console.log('===========1')
    const find_tracker = await ActivityLogTracker.findOne({where:{log_tracker_id:find_tracker_id}})
    if(!find_tracker){
        return false;
    }
   console.log(find_tracker,'===========')
   const query = JSON.parse(find_tracker.query_params)
    const create_log = await ActivityLog.create({
        tenant_id:find_tracker.tenant_id,
        module_id:query?.mdl ||null,
        module_name:module_name,
        user_id:find_tracker.user_id,
        action:action,
        // description:data.description,
        change:JSON.stringify(data),
        // ip_address:data.ip_address,
        id_value:query?.lead_id ||null,
        changed_at:new Date(),
    })

    return true
  } catch (error) {
    console.log(error)
    return false;
  }
};
