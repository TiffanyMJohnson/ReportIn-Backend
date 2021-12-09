import models
from flask import Blueprint, request, jsonify

from playhouse.shortcuts import model_to_dict

from flask_login import current_user, login_required

memos = Blueprint('memos', 'memos')

@memos.route('/', methods=['GET'])
@login_required
def memos_index():
    result = models.Dog.select()

    print("")
    print('result of memo select query')
    print(result)

    
    current_user_memo_dicts = [model_to_dict(dog) for memo in current_user.memos] 

    for memo_dict in current_user_memo_dicts:
        memo_dict['owner'].pop('password')

    return jsonify({
        'data': current_user_memo_dicts,
        'message': f"Successfully found {len(current_user_dog_dicts)} dogs",
        'status': 200
    }), 200



@memo.route('/', methods=['POST'])
def create_memo():
    
    payload = request.get_json() 
    print(payload) 
    new_memo = models.Memo.create(title=payload['title'], date=payload['date'], body=payload['body'])
    print(new_memo) 
    memo_dict = model_to_dict(new_memo)

    # dog_dict['owner'].pop('password')

    return jsonify(
        data=memo_dict,
        message='Successfully posted memo!',
        status=201
    ), 201

# SHOW ROUTE
# GET api/v1/dogs/<dog_id>
# in express it looked something like this
# router.get('/:id')

@memos.route('/<id>', methods=['GET'])
def get_one_memos(id):
    memo = models.Memo.get_by_id(id)
    print(memo)
    return jsonify(
        data = model_to_dict(memo),
        message = 'Success!!!! 🎉',
        status = 200
    ), 200

# PUT UPDATE ROUTE
# PUT api/v1/dogs/<id>
@memos.route('/<id>', methods=['PUT'])
def update_memo(id):
    payload = request.get_json()

    models.Memo.update(**payload).where(models.Memo.id == id).execute()

    return jsonify(
        data = model_to_dict(models.Memo.get_by_id(id)),
        message = 'memo updated successfully',
        status = 200,
    ), 200


#DELETE ROUTE
@memos.route('/<id>', methods=['DELETE'])
def delete_memo(id):
    
    delete_query = models.Memo.delete().where(models.Memo.id == id)
    nums_of_rows_deleted = delete_query.execute()
    print(nums_of_rows_deleted)

    return jsonify(
        data={},
        message=f"Successfully deleted {nums_of_rows_deleted} memo with id {id}",
        status=200
    ), 200
